import { Link } from "react-router-dom";
import { IoMoon, IoSunny, IoAddCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleColorMode = () => setDarkMode((prevMode) => !prevMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="container max-w-screen-lg px-4 mx-auto py-6 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:justify-between sm:h-20 bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4">
        <div className="text-3xl sm:text-4xl font-bold uppercase text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          <Link to="/">Product Store 🛒</Link>
        </div>

        <div className="flex space-x-4 items-center">
          <Link to="/create">
            <button
              aria-label="Create New Item"
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <IoAddCircleOutline className="text-2xl" />
            </button>
          </Link>
          <button
            onClick={toggleColorMode}
            aria-label="Toggle Dark Mode"
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            {darkMode ? (
              <IoSunny className="text-2xl" />
            ) : (
              <IoMoon className="text-2xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
