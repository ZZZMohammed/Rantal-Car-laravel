
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // assuming you're using token-based auth
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error("There was an error fetching the bookings!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <li key={booking.id}>
              <p>Car: {booking.car_name}</p>
              <p>Booking Date: {booking.date}</p>
              <p>Status: {booking.status}</p>
            </li>
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </ul>
    </div>
  );
};

export default MyBookings;
