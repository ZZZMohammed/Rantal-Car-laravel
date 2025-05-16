import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/actions/BookAction';

export default function Cars() {
  const dispatch = useDispatch();
  
  
  const { data: cars = [], loading, error } = useSelector((state) => state.cars || {});

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (loading) return <div className="loading">Loading cars...</div>;
  if (error) return <div className="error">Error: {error.message || 'Failed to load cars'}</div>;

  return (
    <div className="cars-container">
      <h1 className="cars-title">All Cars</h1>
      {cars.length === 0 && !loading && (
        <div className="no-cars">No cars available</div>
      )}
      
      <div className="cars-list">
        {cars.map((car) => (
          <div key={car.id} className="car-item">
            <h2>{car.brand} {car.model}</h2>
            <p>Price: ${car.price_per_day}/day</p>
            <p className={car.is_available ? 'available' : 'booked'}>
              {car.is_available ? 'Available' : 'Booked'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}