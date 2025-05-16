import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price_per_day: '',
    is_available: true,
    image: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  // Get auth token from localStorage
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/cars', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login again');
        }
        throw new Error('Failed to fetch cars');
      }
      
      const data = await response.json();
      setCars(data);
    } catch (err) {
      setError(err.message);
      // Redirect to login if unauthorized
      if (err.message.includes('Unauthorized')) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login again');
        }
        throw new Error('Failed to create car');
      }
      
      const newCar = await response.json();
      setCars([...cars, newCar.book || newCar]); // Handle both response formats
      setFormData({
        brand: '',
        model: '',
        year: '',
        price_per_day: '',
        is_available: true,
        image: ''
      });
      setIsCreating(false);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('Unauthorized')) {
        navigate('/login');
      }
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cars/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login again');
        }
        throw new Error('Failed to update car');
      }
      
      const updatedCar = await response.json();
      setCars(cars.map(car => car.id === id ? updatedCar : car));
    } catch (err) {
      setError(err.message);
      if (err.message.includes('Unauthorized')) {
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    
    try {
      const response = await fetch(`http://localhost:8000/api/cars/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login again');
        }
        throw new Error('Failed to delete car');
      }
      
      setCars(cars.filter(car => car.id !== id));
    } catch (err) {
      setError(err.message);
      if (err.message.includes('Unauthorized')) {
        navigate('/login');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  if (!authToken) {
    return (
      <div className="unauthorized">
        <h2>Unauthorized Access</h2>
        <p>Please login to access this page.</p>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  if (loading) return <div className="loading">Loading cars...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="cars-container">
      {/* ... rest of your JSX remains the same ... */}
    </div>
  );
}