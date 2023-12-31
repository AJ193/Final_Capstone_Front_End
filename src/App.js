import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';
import { useDispatch } from 'react-redux';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import Cars from './pages/Cars';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Reservations from './pages/AddReservations';
import MyReservations from './pages/Reservations';
import AddCar from './pages/AddCar';
import DeleteCar from './pages/DeleteCar';
import CarDetails from './pages/CarDetails';
import { fetchCars } from './redux/cars/carsSlice';

function App() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'dark';
  });

  const handleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode ? 'dark' : 'light');
    const localTheme = localStorage.getItem('darkMode');
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [darkMode]);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div className={`${darkMode ? 'dark' : ''} grid grid-cols-12 h-screen`}>
      <div className="h-14 col-span-12 md:col-span-2 md:h-full bg-gray-200 ">
        <Navbar dark={handleDarkMode} data={darkMode} />
      </div>

      <div className="col-span-12 md:col-span-10">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/cars"
            element={<Cars />}
          />
          <Route
            path="/car_details/:id"
            element={<CarDetails />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/reservations"
            element={(
              <RequireAuth loginPath="/login">
                <MyReservations />
              </RequireAuth>
            )}
          />
          <Route
            path="/add_reservation"
            element={(
              <RequireAuth loginPath="/login">
                <Reservations />
              </RequireAuth>
            )}
          />
          <Route
            path="/add_car"
            element={(
              <RequireAuth loginPath="/login">
                <AddCar />
              </RequireAuth>
            )}
          />
          <Route
            path="/delete_car"
            element={(
              <RequireAuth loginPath="/login">
                <DeleteCar />
              </RequireAuth>
            )}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
