
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/bookings', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
    setLoading(false);
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

      if (response.ok) {
        setBookings(bookings.filter(booking => booking.id !== id));
      } else {
        console.error('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleUpdate = async (id) => {
    const newTotalPrice = prompt("Enter new total price:");
    if (!newTotalPrice) return;

    try {
      const response = await fetch(`http://localhost:8000/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ total_price: newTotalPrice }),
      });

      if (response.ok) {
        fetchBookings(); // Refresh bookings after update
      } else {
        console.error('Failed to update booking');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="container mt-5">
      <h2>Dashboard - Bookings</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.user?.name || "Unknown"}</td>
                <td>${booking.total_price}</td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleUpdate(booking.id)}>
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(booking.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
