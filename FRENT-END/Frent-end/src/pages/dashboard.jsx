import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    console.log('Bookings updated:', bookings);
  }, [bookings]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/bookings', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.status}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Received data is not an array');
      }

      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete booking: ${response.status}`);
      }

      setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert(`Error deleting booking: ${error.message}`);
    }
  };

  const handleUpdate = async (id) => {
    const newTotalPrice = prompt("Enter new total price:");
    if (newTotalPrice === null || newTotalPrice.trim() === '') return;

    try {
      const response = await fetch(`http://localhost:8000/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ total_price: parseFloat(newTotalPrice) }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update booking: ${response.status}`);
      }

      // Refresh the bookings after successful update
      await fetchBookings();
      alert('Booking updated successfully!');
    } catch (error) {
      console.error('Error updating booking:', error);
      alert(`Error updating booking: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="container pt-5">
        <h2>Dashboard - Bookings</h2>
        
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <h2>Dashboard - Bookings</h2>
        <div className="alert alert-danger">
          Error loading bookings: {error}
          <button className="btn btn-sm btn-warning ms-3" onClick={fetchBookings}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="container mt-5">
      <h2>Dashboard - Bookings</h2>
      {bookings.length === 0 ? (
        <div className="alert alert-info">No bookings found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Total Price</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.user?.name || "Unknown"}</td>
                  <td>${parseFloat(booking.total_price).toFixed(2)}</td>
                  <td>{new Date(booking.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-warning btn-sm" 
                        onClick={() => handleUpdate(booking.id)}
                      >
                        Update
                      </button>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => handleDelete(booking.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <h2> <Link to={'/cars'}>Dashboard - Bookings</Link></h2>
    </>

  );
}