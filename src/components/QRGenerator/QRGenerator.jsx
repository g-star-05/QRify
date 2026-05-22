import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
  const [qrBase64, setQrBase64] = useState("");
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
    if (location.state?.templateText) setText(location.state.templateText);
    if (location.state?.businessTitle) setBusinessTitle(location.state.businessTitle);
    if (location.state?.businessSubtitle) setBusinessSubtitle(location.state.businessSubtitle);
  }, [location.state]);

  // Clean up logo object URL on unmount
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  // Helper — load an image URL into an HTMLImageElement
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  };

  // Helper — convert any image URL to base64 data URL
  const toBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext("2d").drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => reject(new Error(`Failed to convert to base64: ${url}`));
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
        { text, color: qrColor, background: bgColor }
      );
      if (response.data?.qr_url) {
        const imageUrl = `${import.meta.env.VITE_API_URL}${response.data.qr_url}`;
        setQrImage(imageUrl);
        try {
          const base64 = await toBase64(imageUrl);
          setQrBase64(base64);
        } catch (err) {
          console.error("Failed to convert QR to base64:", err);
          setQrBase64(imageUrl);
        }
      } else {
        console.error("QR generation failed: qr_url missing", response.data);
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
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      setSelectedLogo("");
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // ─────────────────────────────────────────────────────────────
  // DOWNLOAD — Pure Canvas rendering (pixel-perfect, no html2canvas)
  //
  // We manually draw every element onto a canvas in the exact same
  // layout as the preview:
  //   1. Rounded dark background frame
  //   2. QR image with white rounded card behind it
  //   3. Circular logo centered on the QR (if enabled)
  //   4. Business title above QR (if present)
  //   5. Business subtitle below QR (if present)
  //
  // This guarantees the download looks identical to the preview
  // because we control every pixel — no CSS interpretation needed.
  // ─────────────────────────────────────────────────────────────
  const downloadQR = async () => {
    if (!qrBase64) return;

    try {
      const SCALE = 3;                   // 3x for high resolution output
      const SIZE = 360 * SCALE;          // canvas total size
      const RADIUS = 38 * SCALE;         // frame border-radius
      const PADDING = 30 * SCALE;        // frame padding
      const QR_SIZE = 190 * SCALE;       // QR image size
      const QR_PADDING = 14 * SCALE;     // white card padding around QR
      const QR_RADIUS = 28 * SCALE;      // white card border-radius
      const LOGO_SIZE = 58 * SCALE;      // logo circle size
      const LOGO_BORDER = 3 * SCALE;     // white border around logo
      const FONT_SCALE = SCALE;

      const canvas = document.createElement("canvas");
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext("2d");

      // ── 1. Draw rounded frame background ──────────────────────
      const frameBg = businessTitle ? frameBgColor : "#020617";
      ctx.fillStyle = frameBg;
      ctx.beginPath();
      ctx.roundRect(0, 0, SIZE, SIZE, RADIUS);
      ctx.fill();

      // ── 2. Draw business title (above QR) ─────────────────────
      let currentY = PADDING;
      if (businessTitle) {
        ctx.fillStyle = frameTextColor;
        ctx.font = `${800} ${24 * FONT_SCALE}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(businessTitle, SIZE / 2, currentY);
        currentY += 24 * FONT_SCALE + 18 * SCALE; // title height + gap
      }

      // ── 3. Draw white rounded card behind QR ──────────────────
      const cardSize = QR_SIZE + QR_PADDING * 2;
      const cardX = (SIZE - cardSize) / 2;
      const cardY = businessTitle
        ? currentY
        : (SIZE - cardSize) / 2;

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardSize, cardSize, QR_RADIUS);
      ctx.fill();

      // ── 4. Draw QR image inside white card ────────────────────
      const qrImg = await loadImage(qrBase64);
      const qrX = cardX + QR_PADDING;
      const qrY = cardY + QR_PADDING;

      // Clip QR to rounded rect so it stays inside the card
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(qrX, qrY, QR_SIZE, QR_SIZE, QR_RADIUS - QR_PADDING);
      ctx.clip();
      ctx.drawImage(qrImg, qrX, qrY, QR_SIZE, QR_SIZE);
      ctx.restore();

      // ── 5. Draw circular logo centered on QR ──────────────────
      const activeLogo = logoPreview || selectedLogo;
      if (addLogo && activeLogo) {
        const logoImg = await loadImage(activeLogo);
        const logoCenterX = SIZE / 2;
        const logoCenterY = cardY + cardSize / 2;
        const logoRadius = LOGO_SIZE / 2;

        // White border circle
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(logoCenterX, logoCenterY, logoRadius + LOGO_BORDER, 0, Math.PI * 2);
        ctx.fill();

        // Clip logo into circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(logoCenterX, logoCenterY, logoRadius, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(
          logoImg,
          logoCenterX - logoRadius,
          logoCenterY - logoRadius,
          LOGO_SIZE,
          LOGO_SIZE
        );
        ctx.restore();
      }

      // ── 6. Draw business subtitle (below QR) ──────────────────
      if (businessSubtitle) {
        const subtitleY = cardY + cardSize + 18 * SCALE;
        ctx.fillStyle = frameTextColor;
        ctx.font = `${400} ${15 * FONT_SCALE}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(businessSubtitle, SIZE / 2, subtitleY);
      }

      // ── 7. Trigger download ────────────────────────────────────
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `qr-${Date.now()}.png`;
      link.click();

    } catch (error) {
      console.error("QR download error:", error);
    }
  };

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

          <div className="input-group">
            <input
              type="text"
              placeholder="Enter URL"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

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

          <label className="logo-option">
            <input
              type="checkbox"
              checked={addLogo}
              onChange={() => setAddLogo(!addLogo)}
            />
            Add Logo
          </label>

          {addLogo && (
            <>
              <LogoSelector
                selectedLogo={selectedLogo}
                setSelectedLogo={setSelectedLogo}
              />
              <input type="file" accept="image/*" onChange={handleLogoUpload} />
            </>
          )}

          <button
            className="frame-toggle-btn"
            onClick={() => setShowFrames(!showFrames)}
          >
            {showFrames ? "Hide Frames" : "Add Frame"}
          </button>

          {showFrames && (
            <FrameSelector
              selectedFrame={selectedFrame}
              setSelectedFrame={setSelectedFrame}
            />
          )}

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
            {businessTitle && (
              <h2 style={{ color: frameTextColor }}>{businessTitle}</h2>
            )}

            <div className="qr-wrapper">
              {qrBase64 && (
                <img
                  src={qrBase64}
                  alt="QR Code"
                  className="qr-image"
                  crossOrigin="anonymous"
                />
              )}
              {addLogo && activeLogo && (
                <div className="qr-center-logo-wrapper">
                  <img src={activeLogo} alt="Logo" />
                </div>
              )}
            </div>

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
