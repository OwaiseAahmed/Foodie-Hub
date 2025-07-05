import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MenuPage = () => {
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`https://foodie-hub-backend-mauve.vercel.app/api/menu/${restaurantId}`);
        const data = await res.json();
        console.log("Fetched menu data:", data); // For debugging
        setMenu(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setMenu([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [restaurantId]);

  if (loading) return <div className="p-8 text-center text-gray-600">Loading menu...</div>;

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <Link to={`/restaurants/${restaurantId}`} className="text-blue-600 underline mb-6 block">
        ← Back to Restaurant
      </Link>
      <h1 className="text-4xl font-bold text-orange-600 mb-8">Menu</h1>

      {menu.length === 0 ? (
        <p className="text-gray-500">No menu items found or unable to fetch.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {menu.map((item) => (
            <div key={item._id} className="bg-gray-100 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-orange-700">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-800 font-bold mt-2">₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
