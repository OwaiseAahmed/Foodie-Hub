import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace this email with dynamic user email if you implement login
        const userEmail = "testuser@example.com";

        const res = await axios.get(
          "https://foodie-hub-backend-mauve.vercel.app/api/orders"
        );

        const userOrders = res.data.filter((order) => order.user === userEmail);
        setOrders(userOrders);
      } catch (err) {
        console.error("❌ Failed to fetch orders", err.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-3 rounded shadow">
              <p><strong>Restaurant ID:</strong> {order.restaurantId}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <ul className="mt-2 list-disc pl-5">
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} - ₹{item.price}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
