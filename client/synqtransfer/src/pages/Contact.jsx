// pages/Contact.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await axios.post(API_ENDPOINTS.CONTACT, formData);
      if (response.data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen text-[#F9F9F9] px-6 py-12 font-sans">
      <div className="max-w-4xl mx-auto bg-[#1A1A1A] p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-[#FF6F3C] mb-6">Contact Us</h1>

        <p className="text-sm text-[#CCCCCC] mb-4">
          Have questions, feedback, or a support request? We’d love to hear from you. Fill out the form below or reach out via email, and someone from our team will respond within 24 hours.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded bg-[#2D2D2D] border border-[#444] text-sm"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded bg-[#2D2D2D] border border-[#444] text-sm"
            required
          />
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full px-4 py-2 rounded bg-[#2D2D2D] border border-[#444] text-sm"
            required
          ></textarea>
          <button
                type="submit"
                disabled={status === 'loading'}
                className={`bg-[#FF6F3C] hover:bg-[#e55a24] text-white font-semibold px-6 py-2 rounded ${
                    status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
          {status === 'success' && <p className="text-green-400 text-sm">Message sent successfully!</p>}
          {status === 'error' && <p className="text-red-400 text-sm">Failed to send message. Try again later.</p>}
        </form>

        <div className="mt-8 text-sm text-[#CCCCCC]">
          Or email us at: <a href="mailto:ashishyelisetty@gmail.com" className="underline text-[#FFC93C]">support@synqtransfer.com</a>
        </div>

        <footer className="pt-6 text-sm text-[#777] border-t border-[#2D2D2D] mt-8">
          &copy; {new Date().getFullYear()} SynqTransfer. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Contact;