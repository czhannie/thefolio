// frontend/src/pages/ContactPage.js
import { useState } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name || formData.name.length < 2)
      newErrors.name = "Name must be at least 2 characters.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (!formData.message || formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters long.";

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <main>
        <h2>Contact Us</h2>
        <p>
          Have a question about my projects or want to recommend a new K-Drama?
          Fill out the form below.
        </p>

        {submitted ? (
          <div
            className="styled-form"
            style={{
              textAlign: "center",
              padding: "40px 20px",
              marginBottom: "30px",
            }}
          >
            <h3
              style={{
                color: "var(--primary-color)",
                marginBottom: "10px",
                fontSize: "1.8rem",
              }}
            >
              Thank you, {formData.name}!
            </h3>
            <p style={{ fontSize: "1.1rem", color: "var(--text-main)" }}>
              Your message has been safely delivered.
            </p>
          </div>
        ) : (
          <form className="styled-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && (
                <span className="error">{errors.message}</span>
              )}
            </div>

            <input type="submit" value="Send Message" className="btn" />
          </form>
        )}

        <hr />

        <h3>Useful Resources</h3>
        <table>
          <thead>
            <tr>
              <th>Resource Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a
                  href="https://www.w3schools.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  W3Schools
                </a>
              </td>
              <td>
                A comprehensive guide for learning HTML, CSS, and JavaScript.
              </td>
            </tr>
            <tr>
              <td>
                <a
                  href="https://developer.mozilla.org"
                  target="_blank"
                  rel="noreferrer"
                >
                  MDN Web Docs
                </a>
              </td>
              <td>
                The official documentation for web standards and API references.
              </td>
            </tr>
            <tr>
              <td>
                <a
                  href="https://stackoverflow.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Stack Overflow
                </a>
              </td>
              <td>A community-based Q&A platform for coding and debugging.</td>
            </tr>
          </tbody>
        </table>

        <h3>Our Location</h3>
        <div className="map-placeholder" style={{ marginTop: "20px" }}>
          <iframe
            title="Google Maps Location"
            width="100%"
            height="300"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?q=Tokyo,Japan&hl=en&z=12&output=embed"
            style={{
              border: "1px solid #ddd",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(130, 102, 127, 0.15)",
            }}
          ></iframe>
        </div>
      </main>
      <footer>
        <p>
          &copy; 2026 Maerose Joscel Czarinah Boadilla. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

export default ContactPage;