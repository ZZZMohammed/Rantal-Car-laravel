import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/actions/BookAction';

export default function Cars() {
  const dispatch = useDispatch();
  const { Cars = [], loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (loading) return <div>Loading cars...</div>;
  if (error) return <div>Error: {typeof error === 'string' ? error : 'Failed to load cars'}</div>;

  return (
    <div>
      <h1>All Cars</h1>
      {Cars.length === 0 && !loading && <div>No cars available</div>}
      {Cars.map((car) => (
        <div key={car.id}>
          {car.brand} - {car.model} - ${car.price_per_day}/day
          {car.is_available ? ' (Available)' : ' (Booked)'}
        </div>
      ))}
    </div>
  );
}