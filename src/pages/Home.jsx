import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/Context";

const Home = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: "", mobile: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName.trim()) tempErrors.firstName = "First name is required";
    if (!/^\d{10}$/.test(formData.mobile)) tempErrors.mobile = "Enter a valid 10-digit mobile number";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setUser(formData);
      navigate("/map");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="p-8 rounded-lg shadow-md bg-yellow-500 w-80">
        <h2 className="text-center text-2xl font-bold mb-4">Enter Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">First Name</label>
            <input
              type="text"
              className="w-full p-2 mt-1 rounded bg-black text-white border border-yellow-500 focus:outline-none"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block font-semibold">Mobile Number</label>
            <input
              type="text"
              className="w-full p-2 mt-1 rounded bg-black text-white border border-yellow-500 focus:outline-none"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>
          <button className="w-full bg-black text-yellow-500 py-2 rounded hover:bg-gray-900">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;