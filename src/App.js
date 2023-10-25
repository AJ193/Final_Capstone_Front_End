import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./layouts/Navbar";
import Home from "./pages/Home";
import About from "./pages/About"

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "dark";
  });

  const handleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode ? "dark" : "light");
    const localTheme = localStorage.getItem("darkMode");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [darkMode]);
  
  return (
    <div className={`${darkMode ? "dark" : ""} grid grid-cols-12 h-screen`}>
      {/* First Column (2/12) */}
      <div className="h-14 col-span-12 md:col-span-2 md:h-full bg-gray-200">
      <Navbar dark={handleDarkMode} data={darkMode} />
      </div>

      {/* Second Column (10/12) */}
      <div className="col-span-12 md:col-span-10 bg-teal-300 p-4 h-screen">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
