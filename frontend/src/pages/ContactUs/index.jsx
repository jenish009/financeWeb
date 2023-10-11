import React, { useState } from "react";
import "./ContactForm.css"; // Import the CSS file

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add code here to send the form data to your server for processing
    console.log(formData);

    // Set formSubmitted to true to display a success message
    setFormSubmitted(true);
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      {formSubmitted ? (
        <div className="success-message">
          <p>Thank you for reaching out! We'll get back to you soon.</p>
        </div>
      ) : (
        <>
          <p>We'd love to hear from you. Please fill out the form below:</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit">Send Message</button>
          </form>
        </>
      )}
      <div className="contact-details">
        <h3>Contact Information</h3>
        <p>If you prefer to contact us through other means:</p>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:admin@financialhub.info">admin@financialhub.info</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ContactForm;
