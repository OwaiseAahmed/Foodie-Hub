// src/pages/Reservation.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    restaurantId: "",
    date: "",
    time: "",
    guests: "",
  });
  const [restaurants, setRestaurants] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(
          "https://foodie-hub-backend-mauve.vercel.app/api/restaurants"
        );
        setRestaurants(res.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://foodie-hub-backend-mauve.vercel.app/api/reservations",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Reservation successful!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        restaurantId: "",
        date: "",
        time: "",
        guests: "",
      });
    } catch (err) {
      console.error("Reservation error:", err);
      setMessage("Reservation failed.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Book a Reservation</h2>
      {message && (
        <p className="mb-4 text-center text-green-600 font-semibold">{message}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <select
          name="restaurantId"
          value={formData.restaurantId}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Restaurant</option>
          {restaurants.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="guests"
          placeholder="Number of guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Reserve Now
        </button>
      </form>
    </div>
  );
}
