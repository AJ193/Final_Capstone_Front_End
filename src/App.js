import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';
import Navbar from './layouts/Navbar';
import Register from './pages/Register';
import Home from './pages/Home';
import Cars from './pages/Cars';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
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

  return (
    <div className={`${darkMode ? 'dark' : ''} grid grid-cols-12 h-screen`}>
      {/* First Column (2/12) */}
      <div className="h-14 col-span-12 md:col-span-2 md:h-full bg-gray-200">
        <Navbar dark={handleDarkMode} data={darkMode} />
      </div>

      {/* Second Column (10/12) */}
      <div className="col-span-12 md:col-span-10 h-screen">
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
            path="/about"
            element={(
              <RequireAuth loginPath="/login">
                <About />
              </RequireAuth>
            )}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
