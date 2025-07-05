import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-pink-100 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Welcome to FoodieHub 🍝</h1>
      <p className="text-lg text-gray-600 mb-8">
        Discover restaurants, order food, and enjoy exclusive recipes!
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
