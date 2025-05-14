import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindCar() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authToken');
  

  useEffect(() => {
    axios.get("http://localhost:8000/api/cars", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      setCars(response.data);
    })
    .catch((error) => {
      console.error("Error fetching cars:", error);
      setError(error.response?.data?.message || 'Failed to load cars');
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Cars</h2>
      <div className="row">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src=''
                  className="card-img-top"
                  alt={car.model}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    {car.brand} - {car.model}
                  </h5>
                  <p className="card-text">Year: {car.year}</p>
                  <p className="card-text">
                    Price Per Day: ${car.price_per_day}
                  </p>
                  <span className={`badge ${car.is_available ? "bg-success" : "bg-danger"} mb-3`}>
                    {car.is_available ? "Available" : "Not Available"}
                  </span>
                  
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No cars available</p>
        )}
      </div>
    </div>
  );
}