import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AudioTemplate.css";

const AudioTemplate = () => {
  const navigate = useNavigate();

  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateAudioQR = async () => {
    if (!audio) return;

    try {
      setLoading(true);
      setError("");

      const form = new FormData();
      form.append("file", audio);

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
      console.error("Audio upload failed:", err);
      setError("Failed to upload audio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // FIX 1: Added className="audio-template" so the CSS section styles apply
    <div className="audio-template">

      {/* FIX 2: Added className="audio-template-card" so card styles apply */}
      <div className="audio-template-card">

        <h1>Audio QR</h1>
        <p>Upload an audio file and generate a QR code that plays it instantly when scanned.</p>

        {/* FIX 3: Added file input with className so CSS hover styles apply */}
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            setAudio(e.target.files[0]);
            setError("");
          }}
        />

        {/* FIX 4: Added selected file name display using .selected-file class */}
        {audio && (
          <div className="selected-file">
            🎵 {audio.name}
          </div>
        )}

        {/* FIX 5: Show error message if upload fails */}
        {error && (
          <div className="audio-error">{error}</div>
        )}

        <button
          onClick={generateAudioQR}
          disabled={!audio || loading}
        >
          {loading ? "Uploading..." : "Generate QR"}
        </button>

      </div>
    </div>
  );
};

export default AudioTemplate;
