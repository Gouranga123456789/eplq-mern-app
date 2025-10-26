import React from 'react';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message!');
    e.target.reset();
  };

  return (
    <div className="container page-container">
      <h2>Contact Us</h2>
      <p>Have a question or feedback? We'd love to hear from you.</p>
      <form onSubmit={handleSubmit} className="auth-form" style={{marginTop: '2rem'}}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea
          placeholder="Your Message"
          rows="6"
          style={{
            padding: '12px 15px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '16px',
            fontFamily: 'inherit',
          }}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;