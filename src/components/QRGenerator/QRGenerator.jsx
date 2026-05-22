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
  const [qrImage, setQrImage] = useState("");
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

  // FIX 1: Clean up logo object URL on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

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

      // FIX 2: Guard against missing qr_url in response
      if (response.data?.qr_url) {
        setQrImage(`${import.meta.env.VITE_API_URL}${response.data.qr_url}`);
      } else {
        console.error("QR generation failed: qr_url missing in response", response.data);
      }
    } catch (error) {
      // FIX 3: console.log → console.error for proper error reporting
      console.error("QR generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle logo file upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // FIX 4: Revoke previous object URL before creating a new one
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
      setSelectedLogo("");
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Download QR preview as PNG using html2canvas
  const downloadQR = async () => {
    // FIX 5: Guard — also check qrImage exists before trying to download
    if (!qrDownloadRef.current || !qrImage) return;

    try {
      const canvas = await html2canvas(qrDownloadRef.current, { scale: 3 });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `qr-${Date.now()}.png`;
      link.click();
    } catch (error) {
      // FIX 6: downloadQR had no error handling at all — added try/catch
      console.error("QR download error:", error);
    }
  };

  // FIX 7: Extracted logo src logic into a variable for cleaner JSX
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
              {qrImage && (
                <img src={qrImage} alt="QR Code" className="qr-image" />
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
