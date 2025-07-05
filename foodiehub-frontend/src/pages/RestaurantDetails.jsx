import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    fetch(`https://foodie-hub-backend-mauve.vercel.app/api/restaurants/${id}`)
      .then(res => res.json())
      .then(data => setRestaurant(data))
      .catch(err => console.log("Error loading restaurant:", err));
  }, [id]);

  if (!restaurant) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">{restaurant.name}</h2>
      <p className="text-gray-600 mt-1">{restaurant.location}</p>
      <p className="mt-3">{restaurant.description}</p>
      <p className="mt-3 text-sm italic">{restaurant.cuisine}</p>
    </div>
  );
}
