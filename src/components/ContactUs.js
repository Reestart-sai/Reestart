import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/ContactUs.css'; // Import your CSS

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      to_name: 'Reestart Team',
      phone: formData.phone,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(
        'service_1au4ui4', // Replace with your Service ID
        'template_oidwm2x', // Replace with your Template ID
        templateParams,
        '4UogttN1Ob2jXxThl' // Replace with your EmailJS API key (User ID)
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully!');
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        console.error('FAILED...', error);
        alert('Failed to send the message. Please try again.');
      });
  };

  return (
    <div className="contact-us">
      <h1>Connect with Us</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
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
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>

      <div className="reach-us">
        <h2>Reach Us</h2>
        <p>
          Email: <a href="mailto:reestarts.helpline@gmail.com">reestarts.helpline@gmail.com</a>
        </p>
        <p>
          Phone: <a href="tel:+918985711458">+91-8985711458</a>
        </p>
        <p>
          Address: Korapu Kothavalasa Village, Dattirajeru, Vizianagaram, Andhra Pradesh - 535579
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
