import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";

import FrameSelector from "../Frames/FrameSelector";
import LogoSelector from "../LogoSelector/LogoSelector";

import "./QRGenerator.css";

const QRGenerator = () => {
  const location = useLocation();
  const qrDownloadRef = useRef(null);

  // Core state
  const [text, setText] = useState("");
  const [qrColor, setQrColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrImage, setQrImage] = useState("");       // external URL (for display)
  const [qrBase64, setQrBase64] = useState("");     // FIX: base64 version (for download)
  const [loading, setLoading] = useState(false);

  // Frame state
  const [showFrames, setShowFrames] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState("");

  // Logo state
  const [addLogo, setAddLogo] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");

  // Business / template state
  const [businessTitle, setBusinessTitle] = useState("");
  const [businessSubtitle, setBusinessSubtitle] = useState("");
  const [frameBgColor, setFrameBgColor] = useState("#020617");
  const [frameTextColor, setFrameTextColor] = useState("#ffffff");

  // Pre-fill fields if navigated from a template page
  useEffect(() => {
    if (location.state?.templateText) {
      setText(location.state.templateText);
    }
    if (location.state?.businessTitle) {
      setBusinessTitle(location.state.businessTitle);
    }
    if (location.state?.businessSubtitle) {
      setBusinessSubtitle(location.state.businessSubtitle);
    }
  }, [location.state]);

  // Clean up logo object URL on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  // FIX: Helper — fetch an image URL and convert it to a base64 data URL
  // html2canvas cannot render cross-origin images unless they are base64
  const toBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";  // request CORS headers from server
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  };

  // Generate QR code via API
  const generateQR = async () => {
    if (!text) return;

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/qr/generate`,
        {
          text,
          color: qrColor,
          background: bgColor,
        }
      );

      if (response.data?.qr_url) {
        const imageUrl = `${import.meta.env.VITE_API_URL}${response.data.qr_url}`;
        setQrImage(imageUrl);

        // FIX: Immediately convert QR image to base64 after generation
        // so html2canvas can render it correctly during download
        try {
          const base64 = await toBase64(imageUrl);
          setQrBase64(base64);
        } catch (err) {
          console.error("Failed to convert QR to base64:", err);
          // Fall back to direct URL — download may still work if same origin
          setQrBase64(imageUrl);
        }
      } else {
        console.error("QR generation failed: qr_url missing in response", response.data);
      }
    } catch (error) {
      console.error("QR generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle logo file upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
      setSelectedLogo("");
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Download QR preview as PNG using html2canvas
  const downloadQR = async () => {
    if (!qrDownloadRef.current || !qrImage) return;

    try {
      const canvas = await html2canvas(qrDownloadRef.current, {
        scale: 3,
        useCORS: true,       // FIX: allow html2canvas to load cross-origin images
        allowTaint: false,   // FIX: keep canvas clean (tainted canvas blocks toDataURL)
        logging: false,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `qr-${Date.now()}.png`;
      link.click();
    } catch (error) {
      console.error("QR download error:", error);
    }
  };

  // Active logo source — uploaded file takes priority over selected preset
  const activeLogo = logoPreview || selectedLogo;

  return (
    <section className="qr-generator-section">

      {/* Header */}
      <div className="qr-generator-header">
        <h1>Create QR</h1>
        <p>Professional QR Generator</p>
      </div>

      <div className="qr-generator-container">

        {/* Form Panel */}
        <div className="qr-form">

          {/* URL / Text input */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter URL"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* QR color + Background color */}
          <div className="color-picker-row">
            <div className="color-box">
              <label>QR Color</label>
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
              />
            </div>
            <div className="color-box">
              <label>Background</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          </div>

          {/* Template color pickers — only shown when businessTitle exists */}
          {businessTitle && (
            <div className="color-picker-row">
              <div className="color-box">
                <label>Template BG</label>
                <input
                  type="color"
                  value={frameBgColor}
                  onChange={(e) => setFrameBgColor(e.target.value)}
                />
              </div>
              <div className="color-box">
                <label>Text Color</label>
                <input
                  type="color"
                  value={frameTextColor}
                  onChange={(e) => setFrameTextColor(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Logo toggle */}
          <label className="logo-option">
            <input
              type="checkbox"
              checked={addLogo}
              onChange={() => setAddLogo(!addLogo)}
            />
            Add Logo
          </label>

          {/* Logo options — shown only when addLogo is true */}
          {addLogo && (
            <>
              <LogoSelector
                selectedLogo={selectedLogo}
                setSelectedLogo={setSelectedLogo}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
              />
            </>
          )}

          {/* Frame toggle button */}
          <button
            className="frame-toggle-btn"
            onClick={() => setShowFrames(!showFrames)}
          >
            {showFrames ? "Hide Frames" : "Add Frame"}
          </button>

          {/* Frame selector — shown only when showFrames is true */}
          {showFrames && (
            <FrameSelector
              selectedFrame={selectedFrame}
              setSelectedFrame={setSelectedFrame}
            />
          )}

          {/* Action buttons */}
          <div className="qr-buttons">
            <button className="generate-btn" onClick={generateQR}>
              {loading ? "Generating..." : "Generate QR"}
            </button>
            <button className="download-btn" onClick={downloadQR}>
              Download
            </button>
          </div>

        </div>

        {/* Preview Panel */}
        {/* 
          FIX: The preview div uses qrBase64 (not qrImage) for the QR <img> src.
          This ensures html2canvas can always read the image pixels without
          cross-origin blocking, so the downloaded PNG includes the QR code.
        */}
        <div className="qr-preview-card">
          <div
            ref={qrDownloadRef}
            className={`qr-frame ${selectedFrame}`}
            style={{ background: businessTitle ? frameBgColor : "#020617" }}
          >
            {/* Business title */}
            {businessTitle && (
              <h2 style={{ color: frameTextColor }}>{businessTitle}</h2>
            )}

            {/* QR image + optional logo overlay */}
            <div className="qr-wrapper">
              {qrBase64 && (
                <img
                  src={qrBase64}       // FIX: use base64 src so html2canvas captures it
                  alt="QR Code"
                  className="qr-image"
                />
              )}
              {addLogo && activeLogo && (
                <img
                  src={activeLogo}
                  alt="Logo"
                  className="qr-center-logo"
                />
              )}
            </div>

            {/* Business subtitle */}
            {businessSubtitle && (
              <p style={{ color: frameTextColor }}>{businessSubtitle}</p>
            )}
          </div>

          <h3 className="preview-title">Live Preview</h3>
        </div>

      </div>
    </section>
  );
};

export default QRGenerator;
