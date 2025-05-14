import React, { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ''
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    }

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccessMessage('');
    
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", { withCredentials: true });
      
      const response = await axios.post("http://localhost:8000/api/contacts", form, {
        withCredentials: true,
      });
      
      setSuccessMessage("Message sent successfully!");
      
      setForm({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      setErrors({ api: "Failed to send message. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Contact Us</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errors.api && <div className="alert alert-danger">{errors.api}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} />
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} />
                {errors.phone && <div className="text-danger">{errors.phone}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" name="message" value={form.message} onChange={handleChange} rows="4"></textarea>
                {errors.message && <div className="text-danger">{errors.message}</div>}
              </div>

              <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}