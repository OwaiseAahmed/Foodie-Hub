import { useState } from "react";

export default function Support() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    email: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://foodie-hub-backend-mauve.vercel.app/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Support request submitted!");
        setFormData({ subject: "", message: "", email: "" });
      } else {
        setStatus(data.message || "❌ Failed to submit request.");
      }
    } catch (err) {
      setStatus("❌ Something went wrong.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛟 Contact Support</h1>

      {status && <p className="mb-4 text-center font-semibold">{status}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="w-full border p-3 rounded"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your issue"
          required
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email address"
          required
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
