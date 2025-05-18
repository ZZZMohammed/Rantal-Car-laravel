import React, { useState, useEffect } from 'react'; // This line was missing
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Please login to view bookings');

        const response = await axios.get('http://localhost:8000/api/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        const bookingsData = data.bookings || data.data || data;
        console.log(bookings);
        
        
        if (!Array.isArray(bookingsData)) {
          throw new Error('Unexpected response format from server');
        }

        setBookings(bookingsData);
      } catch (error) {
        console.error("Booking fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!Array.isArray(bookings)) {
    return <div className="alert alert-danger">Invalid data format</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Bookings</h2>
      
      {bookings.length === 0 ? (
        <div className="alert alert-info">No bookings found</div>
      ) : (
        <div className="list-group">
          {bookings.map(booking => (
            <div key={booking.id} className="list-group-item mb-3">
              {/* Your booking details rendering here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;