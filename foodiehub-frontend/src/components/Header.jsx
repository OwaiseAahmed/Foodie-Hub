import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          FoodieHub 🍽️
        </Link>

        <nav className="flex gap-4 items-center">
          <Link to="/" className="hover:text-indigo-500 font-medium">
            Home
          </Link>
          <Link to="/restaurants" className="hover:text-indigo-500 font-medium">
            Restaurants
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/add-restaurant" className="hover:text-indigo-500 font-medium">
                Add Restaurant
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600">
                Login
              </Link>
              <Link to="/signup" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
