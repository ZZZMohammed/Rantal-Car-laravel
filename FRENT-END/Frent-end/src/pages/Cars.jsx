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
  const [editingCarId, setEditingCarId] = useState(null);
  const navigate = useNavigate();

  // Get auth token from localStorage
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setError(null);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('Unauthorized')) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    // Validate minimal inputs
    if (!formData.brand || !formData.model || !formData.year || !formData.price_per_day) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const url = editingCarId
        ? `http://localhost:8000/api/cars/${editingCarId}`
        : 'http://localhost:8000/api/cars';

      const method = editingCarId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
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
        throw new Error(editingCarId ? 'Failed to update car' : 'Failed to create car');
      }

      const car = await response.json();

      if (editingCarId) {
        setCars(cars.map(c => (c.id === editingCarId ? car : c)));
      } else {
        setCars([...cars, car]);
      }

      // Reset form & states
      setFormData({
        brand: '',
        model: '',
        year: '',
        price_per_day: '',
        is_available: true,
        image: ''
      });
      setIsCreating(false);
      setEditingCarId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('Unauthorized')) {
        navigate('/login');
      }
    }
  };

  const startEditing = (car) => {
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price_per_day: car.price_per_day,
      is_available: car.is_available,
      image: car.image || ''
    });
    setEditingCarId(car.id);
    setIsCreating(true);
  };

  const cancelEditing = () => {
    setFormData({
      brand: '',
      model: '',
      year: '',
      price_per_day: '',
      is_available: true,
      image: ''
    });
    setEditingCarId(null);
    setIsCreating(false);
    setError(null);
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
      setError(null);
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

  if (loading) return <div className="loading text-center mt-5"><div className="spinner-border text-primary"></div>Loading cars...</div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{editingCarId ? 'Edit Car' : 'Available Cars'}</h2>

      {isCreating && (
        <form onSubmit={handleCreateOrUpdate} className="mb-4">
          <div className="mb-3">
            <label className="form-label">Brand *</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Model *</label>
            <input
              type="text"
              className="form-control"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Year *</label>
            <input
              type="number"
              className="form-control"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price per day *</label>
            <input
              type="number"
              className="form-control"
              name="price_per_day"
              value={formData.price_per_day}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="is_available"
              name="is_available"
              checked={formData.is_available}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="is_available">Available</label>
          </div>

          {/* Image URL input */}
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Enter image URL"
            />
          </div>

          <button type="submit" className="btn btn-primary me-2">
            {editingCarId ? 'Update Car' : 'Create Car'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={cancelEditing}
          >
            Cancel
          </button>
        </form>
      )}

      {!isCreating && (
        <>
          <button className="btn btn-success mb-3" onClick={() => setIsCreating(true)}>
            Add New Car
          </button>

          <div className="row">
            {cars.length === 0 ? (
              <p>No cars found.</p>
            ) : (
              cars.map(car => (
                <div key={car.id} className="col-md-4 mb-3">
                  <div className="card h-100">
                    {car.image ? (
                      <img src={car.image} alt={`${car.brand} ${car.model}`} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                    ) : (
                      <div style={{height: '200px', backgroundColor: '#ddd', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <span>No Image</span>
                      </div>
                    )}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{car.brand} - {car.model}</h5>
                      <p className="card-text">Year: {car.year}</p>
                      <p className="card-text">Price/Day: ${car.price_per_day}</p>
                      <p className="card-text">
                        Status: {car.is_available ? <span className="text-success">Available</span> : <span className="text-danger">Not Available</span>}
                      </p>
                      <div className="mt-auto d-flex justify-content-between">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => startEditing(car)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(car.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
