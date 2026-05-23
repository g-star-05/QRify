import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PhotoTemplate.css";

const PhotoTemplate = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setError("");
      // FIX: Show image preview before uploading
      setPreview(URL.createObjectURL(file));
    }
  };

  const generatePhotoQR = async () => {
    if (!image) return;

    try {
      setLoading(true);
      setError("");

      const form = new FormData();
      form.append("file", image);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload/`,
        form
      );

      navigate("/qr-generator", {
        state: {
          templateText: `${import.meta.env.VITE_API_URL}${res.data.url}`,
        },
      });
    } catch (err) {
      console.error("Photo upload failed:", err);
      setError("Failed to upload photo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="photo-template">
      <div className="photo-template-card">

        <h1>Photo QR</h1>
        <p>Upload a photo and generate a QR code that opens it instantly when scanned.</p>

        {/* Image preview — shown after file is selected */}
        {preview ? (
          <div className="photo-preview">
            <img src={preview} alt="Preview" />
          </div>
        ) : (
          <div className="photo-placeholder">
            <span>🖼️</span>
            <p>No image selected</p>
          </div>
        )}

        {/* File input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* Selected file name */}
        {image && (
          <div className="selected-file">
            🖼️ {image.name}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="photo-error">{error}</div>
        )}

        <button
          onClick={generatePhotoQR}
          disabled={!image || loading}
        >
          {loading ? "Uploading..." : "Generate QR"}
        </button>

      </div>
    </div>
  );
};

export default PhotoTemplate;
