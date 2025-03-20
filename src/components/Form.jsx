import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/Context";

const Form = () => {
    const [formData, setFormData] = useState({ firstName: "", mobile: "" });
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(formData);
        navigate("/map");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded-md"
            />
            <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded-md"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded-md hover:bg-blue-600">
                Submit
            </button>
        </form>
    );
};

export default Form;
