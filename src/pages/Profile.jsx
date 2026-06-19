import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../features/authSlice";
import api from "../services/api";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const updatedUser = {
        ...user,
        ...formData,
      };

      await api.put(`/users/${user.id}`, updatedUser);

      dispatch(updateProfile(updatedUser));

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">
                My Profile
              </h2>

              <div className="text-center mb-4">
                <img
                  src={
                    formData.image ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile"
                  className="rounded-circle shadow"
                  width="140"
                  height="140"
                />
              </div>

              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label>Name</label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Profile Image URL</label>

                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    placeholder="Paste Image URL"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Role</label>

                  <input
                    type="text"
                    className="form-control"
                    value={user.role}
                    disabled
                  />
                </div>

                <button className="btn btn-primary w-100">
                  Update Profile
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;