import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-gray-800">
        🍴 FoodieHub
      </Link>

      <div className="space-x-4">
        <Link to="/restaurants" className="text-gray-700 hover:text-yellow-600">
          Restaurants
        </Link>
        <Link to="/menu" className="text-gray-700 hover:text-yellow-600">
          Menu
        </Link>
        <Link to="/reservation" className="text-gray-700 hover:text-yellow-600">
          Reservation
        </Link>
        <Link to="/support" className="text-gray-700 hover:text-yellow-600">
          Support
        </Link>

        {user ? (
          <>
            <span className="text-green-600 font-semibold">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
