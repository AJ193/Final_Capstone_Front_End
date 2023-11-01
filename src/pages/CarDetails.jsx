import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleCar } from '../redux/cars/carsSlice';
import formatTimestamp from '../components/Item';

function CarDetails() {
  const carId = useParams();
  const dispatch = useDispatch();
  const { selectedCar, isLoading, error } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchSingleCar(carId.id));
  }, [dispatch, carId.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="h-screen loading loading-bars loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <>
      {selectedCar && (
        // <div>
        //   <p>{selectedCar.model}</p>
        //   <p>{selectedCar.year}</p>
        //   <img src={selectedCar.picture} alt={selectedCar.model} />
        // </div>
        <div className="flex flex-col-reverse gap-8 w-full md:flex-row justify-center h-full p-5">
          <div className="grid flex-grow place-items-center w-2/3 self-center">
            <img src={selectedCar.picture} alt={selectedCar.model} className="w-full" />
          </div>
          <div className="hidden md:block md:border-r-2 md:border-r-gray-500" />
          <div className="grid h-20 flex-grow card place-items-center w-1/3 text-center self-center space-y-10">
            <h1 className="text-4xl font-bold">{selectedCar.model}</h1>
            <p className="text-xl font-semibold">{selectedCar.year}</p>
            <p className="text-xl font-semibold">{formatTimestamp(selectedCar.created_at)}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default CarDetails;
