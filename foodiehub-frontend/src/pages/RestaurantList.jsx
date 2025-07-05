import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("https://foodie-hub-backend-mauve.vercel.app/api/restaurants")
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(err => console.log("Error fetching restaurants:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Explore Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div key={restaurant._id} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold">{restaurant.name}</h3>
            <p className="text-gray-600">{restaurant.location}</p>
            <p className="mt-2">{restaurant.cuisine}</p>
            <Link
              to={`/restaurants/${restaurant._id}`}
              className="text-blue-600 underline mt-3 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
