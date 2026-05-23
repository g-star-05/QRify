import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./EmailTemplate.css";

const EmailTemplate = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  // ─────────────────────────────────────────────────────
  // FIX: Gmail Android does not parse encodeURIComponent
  // correctly in mailto: links. It shows blank subject/body
  // even when the URL looks correct.
  //
  // Root cause: Gmail Android expects RFC 2822 encoding —
  // spaces as %20 is fine BUT special chars like @ # & must
  // be encoded carefully. The real issue is Gmail strips
  // params when the mailto: string contains double-encoded
  // characters or unrecognised sequences.
  //
  // Solution: encode ONLY the characters that MUST be encoded
  // (%20 for space, %0A for newline) and leave the rest as-is.
  // This is the format Gmail Android parses reliably.
  // ─────────────────────────────────────────────────────
  const encodeMailto = (str) => {
    return str
      .replace(/\n/g, "%0A")   // newline
      .replace(/\r/g, "")      // carriage return
      .replace(/&/g, "%26")    // & would break query string
      .replace(/#/g, "%23")    // # would be treated as fragment
      .replace(/\+/g, "%2B")   // + would be decoded as space
      .replace(/ /g, "%20");   // space
  };

  const generateEmailQR = () => {
    if (!email || !email.trim()) {
      alert("Please enter a valid email address");
      return;
    }

    const params = [];
    if (subject.trim()) {
      params.push(`subject=${encodeMailto(subject.trim())}`);
    }
    if (body.trim()) {
      params.push(`body=${encodeMailto(body.trim())}`);
    }

    const emailQR = `mailto:${email.trim()}${
      params.length ? "?" + params.join("&") : ""
    }`;

    navigate("/qr-generator", {
      state: { templateText: emailQR },
    });
  };

  // Live preview of encoded mailto string
  const getPreview = () => {
    if (!email.trim()) return "";
    const params = [];
    if (subject.trim()) params.push(`subject=${encodeMailto(subject.trim())}`);
    if (body.trim()) params.push(`body=${encodeMailto(body.trim())}`);
    return `mailto:${email.trim()}${params.length ? "?" + params.join("&") : ""}`;
  };

  return (
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

        {/* Live preview */}
        {email.trim() && (
          <div className="email-preview">
            <span>QR will encode:</span>
            <code>{getPreview()}</code>
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
