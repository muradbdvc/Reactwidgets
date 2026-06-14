import React, { useState } from 'react';
import './Contact.css';
import thumbnail from './../../assets/contact.jpg'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entries = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    entries.push({ ...form, timestamp: new Date().toISOString() });
    localStorage.setItem('contact_messages', JSON.stringify(entries));
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  if (submitted) {
    return (
      <div className="page">
        <div className="contact-card contact-card--full">
          <div className="contact-success">
            <span className="success-icon">✓</span>
            <h2>Message Sent!</h2>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
            <button className="submit-btn" onClick={() => setSubmitted(false)}>Send Another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="top-content">
        <h2 className="title">Contuct Us</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library,</p>
      </div>
    <div className="page">

      <div className="contact-layout flex">
        <div className="contact-card basis-1/2">
          <h2>Contact</h2>
          <p className="contact-subtitle">Have a question or project? Drop a message.</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Contact Number</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
        <div className="img basis-1/2">
          <img src={thumbnail} alt="contact" />
        </div>

      </div>
    </div>
            <div className="contact-map">
          <h3>Our Location</h3>
          <div className="map-container">
            <iframe
              title="Location Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=18/23.230610/91.114651&layer=mapnik"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="map-info">
            <p>123 Widget Street, React City, RC 10001</p>
          </div>
        </div>
    </div>
  );
}
