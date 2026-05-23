import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./EmailTemplate.css";

const EmailTemplate = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const generateEmailQR = () => {
    if (!email || !email.trim()) {
      alert("Please enter a valid email address");
      return;
    }

    // FIX: Build mailto correctly so subject and body
    // are included when the QR is scanned on any device.
    // encodeURIComponent handles spaces and special characters.
    const params = [];
    if (subject.trim()) params.push(`subject=${encodeURIComponent(subject.trim())}`);
    if (body.trim()) params.push(`body=${encodeURIComponent(body.trim())}`);

    const emailQR = `mailto:${email.trim()}${params.length ? "?" + params.join("&") : ""}`;

    navigate("/qr-generator", {
      state: { templateText: emailQR },
    });
  };

  return (
    // FIX: Wrapped everything in .email-template-wrapper for
    // full-page centering, and kept .email-template as the card
    <div className="email-template-wrapper">
      <div className="email-template">

        <div className="email-template-header">
          <h1>Email QR</h1>
          <p>Create a QR code that opens an email with subject and message pre-filled.</p>
        </div>

        {/* Email address */}
        <div className="email-field">
          <label>Email Address <span>*</span></label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Subject */}
        <div className="email-field">
          <label>Subject</label>
          <input
            type="text"
            placeholder="e.g. Hello, I want to connect"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Body */}
        <div className="email-field">
          <label>Message</label>
          <textarea
            placeholder="e.g. Hi, I scanned your QR code and wanted to reach out..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="5"
          />
        </div>

        {/* Preview of what will be encoded */}
        {email && (
          <div className="email-preview">
            <span>QR will encode:</span>
            <code>
              mailto:{email.trim()}
              {subject.trim() ? `?subject=${encodeURIComponent(subject.trim())}` : ""}
              {body.trim() ? `&body=${encodeURIComponent(body.trim())}` : ""}
            </code>
          </div>
        )}

        <button
          onClick={generateEmailQR}
          disabled={!email.trim()}
        >
          Generate QR
        </button>

      </div>
    </div>
  );
};

export default EmailTemplate;
