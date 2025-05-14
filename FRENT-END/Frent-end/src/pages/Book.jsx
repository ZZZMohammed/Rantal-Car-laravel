import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Book() {
  const location = useLocation();
  const navigate = useNavigate();
  const { carId, userId } = location.state || {}; // ✅ Prevents errors if state is missing

  const [carDetails, setCarDetails] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // Handle missing state
  useEffect(() => {
    if (!carId || !userId) {
      setTimeout(() => navigate("/"), 2000);
    }
  }, [carId, userId, navigate]);

  // Fetch car details
  useEffect(() => {
    if (carId) {
      axios
        .get(`http://localhost:8000/api/cars/${carId}`)
        .then((response) => setCarDetails(response.data))
        .catch((error) =>
          console.error("Error fetching car details:", error)
        );
    }
  }, [carId]);

  // Calculate total price based on dates
  useEffect(() => {
    if (startDate && endDate && carDetails?.price_per_day) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let days = (end - start) / (1000 * 3600 * 24);
      if (days <= 0) days = 1; // Ensure at least one day is charged
      setTotalPrice(days * carDetails.price_per_day);
    }
  }, [startDate, endDate, carDetails]);

  // Handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/bookings",
        {
          user_id: userId,
          car_id: carId,
          start_date: startDate,
          end_date: endDate,
          total_price: totalPrice,
        },
        { headers: { Accept: "application/json", "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        alert("Booking successful!");
        navigate("/"); // Redirect after successful booking
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Booking failed. Please try again.");
    }
  };

  if (!carId || !userId) {
    return <div>No car selected. Redirecting...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Book Your Car</h2>
      {carDetails ? (
        <div className="card p-3 mb-3">
          <h5>{carDetails.brand} - {carDetails.model}</h5>
          <p>Price per day: ${carDetails.price_per_day}</p>
        </div>
      ) : (
        <p>Loading car details...</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="totalPrice">Total Price</label>
          <input
            type="number"
            id="totalPrice"
            className="form-control"
            value={totalPrice}
            disabled
          />
        </div>

        <button type="submit" className="btn btn-success mt-3">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
