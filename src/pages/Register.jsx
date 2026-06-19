import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import api from "../services/api";
import { login } from "../features/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, image } = formData;

    if (!name || !email || !password) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      // Check if email already exists
      const existingUser = await api.get(`/users?email=${email}`);

      if (existingUser.data.length > 0) {
        toast.error("Email already registered");
        return;
      }

      const newUser = {
        name,
        email,
        password,
        image:
          image ||
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        role: "user",
      };

      const res = await api.post("/users", newUser);

      dispatch(login(res.data));

      toast.success("Registration Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="text-center mb-4">
                Register
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Profile Image URL (Optional)
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    placeholder="Paste image URL"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Register
                </button>

              </form>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login">
                  Login
                </Link>
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;