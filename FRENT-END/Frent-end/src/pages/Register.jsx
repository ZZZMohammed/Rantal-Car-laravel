import React, { useState } from 'react';
import axios from 'axios';

export const Register = () => {
  // State to store form data
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  // State to manage error messages
  const [errors, setErrors] = useState({});
  
  // State to manage loading state
  const [loading, setLoading] = useState(false);
  
  // State to manage success message
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  // Validate form before submission
  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage('');

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://localhost:8000/api/register', form);

      console.log('Registration Successful:', response.data);
      setSuccessMessage('Registration successful!');

      // Clear the form after successful submission
      setForm({
        name: '',
        email: '',
        password: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error registering:', error);
      setErrors({ api: 'Failed to register. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>

        {/* Error or Success Messages */}
        {errors.api && <p style={{ color: 'red' }}>{errors.api}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};
