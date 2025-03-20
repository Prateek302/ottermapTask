import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaPhone } from "react-icons/fa";

const FormComponent = ({ setUser }) => {
  const [formData, setFormData] = useState({ firstName: "", mobile: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.mobile) {
      alert("Please fill out all fields!");
      return;
    }
    setUser(formData);
    navigate("/map");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">User Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-green-600" />
            <input
              type="text"
              placeholder="Search something..."
              className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-green-600" />
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <FaPhone className="absolute left-3 top-3 text-green-600" />
            <input
              type="tel"
              name="mobile"
              placeholder="Enter Mobile Number"
              className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
