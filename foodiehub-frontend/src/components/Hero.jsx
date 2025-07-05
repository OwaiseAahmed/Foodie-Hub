import React from "react";

function Hero() {
  const handleOrder = async (item) => {
  try {
    const orderData = {
      user: "testuser@example.com", // Replace with real user email if using auth
      restaurantId: id,
      items: [{ name: item.name, price: item.price }],
      total: item.price,
    };

    const res = await axios.post("https://foodie-hub-backend-mauve.vercel.app/api/orders", orderData);
    alert("✅ Order placed successfully!");
  } catch (err) {
    console.error("❌ Order failed:", err.message);
    alert("❌ Failed to place order.");
  }
};

  return (
    <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <h2 className="text-5xl font-bold mb-4">Discover Deliciousness</h2>
      <p className="text-lg mb-6 max-w-md">
        Explore restaurants, order your favorite meals, and share your food stories on FoodieHub.
      </p>
      <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
        Explore Restaurants
      </button>
    </section>
  );
}

export default Hero;
