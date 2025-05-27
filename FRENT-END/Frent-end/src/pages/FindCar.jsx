import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindCar() {
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    // Fetch authenticated user info first
    axios
      .get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        setError("Failed to get user info");
      });

    // Fetch available cars
    axios
      .get("http://localhost:8000/api/cars?is_available=true", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setError(error.response?.data?.message || "Failed to load cars");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
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
                  src={car.image || "https://via.placeholder.com/400x200?text=No+Image"}
                  className="card-img-top"
                  alt={car.model}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    {car.brand} - {car.model}
                  </h5>
                  <p className="card-text">Year: {car.year}</p>
                  <p className="card-text">Price Per Day: ${car.price_per_day}</p>
                  <span
                    className={`badge ${
                      car.is_available ? "bg-success" : "bg-danger"
                    } mb-3`}
                  >
                    {car.is_available ? "Available" : "Not Available"}
                  </span>
                  {user && (
                    <Link
                      to={"/Book"}
                      state={{ carId: car.id, userId: user.id }}
                      className="btn btn-primary mt-auto"
                    >
                      Book Now
                    </Link>
                  )}
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
