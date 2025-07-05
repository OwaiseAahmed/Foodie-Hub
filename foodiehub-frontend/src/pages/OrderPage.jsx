import { useState } from "react";

export default function OrderPage() {
  const [order, setOrder] = useState({
    restaurantId: "",
    items: "",
    totalAmount: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://foodie-hub-backend-mauve.vercel.app/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Order placed successfully!");
        setOrder({ restaurantId: "", items: "", totalAmount: "" });
      } else {
        setMessage(data.message || "❌ Failed to place order.");
      }
    } catch (err) {
      setMessage("❌ Error placing order.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Place an Order</h1>

      {message && <p className="mb-4 text-center font-semibold">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="restaurantId"
          value={order.restaurantId}
          onChange={handleChange}
          placeholder="Restaurant ID"
          required
          className="w-full border p-3 rounded"
        />

        <textarea
          name="items"
          value={order.items}
          onChange={handleChange}
          placeholder="List your ordered items"
          required
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="totalAmount"
          value={order.totalAmount}
          onChange={handleChange}
          placeholder="Total Amount"
          required
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
