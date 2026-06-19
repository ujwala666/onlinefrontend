import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const AddProject = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [project, setProject] = useState({
    title: "",
    category: "",
    image: "",
    github: "",
    demo: "",
    description: "",
  });

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const {
      title,
      category,
      image,
      github,
      demo,
      description,
    } = project;

    if (
      !title ||
      !category ||
      !image ||
      !github ||
      !demo ||
      !description
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    const newProject = {
      ...project,
      userId: user.id,
      author: user.name,
      rating: 0,
    };

    try {
      await axios.post(
        "https://onlinebackend-wv8o.onrender.com/projects",
        newProject
      );

      toast.success("Project Added Successfully");

      navigate("/my-projects");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add project");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">
                Upload New Project
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Project Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={project.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Category</label>

                  <select
                    className="form-select"
                    name="category"
                    value={project.category}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option>Web Development</option>
                    <option>Mobile App</option>
                    <option>Artificial Intelligence</option>
                    <option>Machine Learning</option>
                    <option>Cyber Security</option>
                    <option>UI/UX</option>
                    <option>Blockchain</option>
                    <option>Cloud Computing</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label>Project Image URL</label>

                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    value={project.image}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>GitHub Link</label>

                  <input
                    type="text"
                    className="form-control"
                    name="github"
                    value={project.github}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Live Demo Link</label>

                  <input
                    type="text"
                    className="form-control"
                    name="demo"
                    value={project.demo}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label>Description</label>

                  <textarea
                    rows="5"
                    className="form-control"
                    name="description"
                    value={project.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button className="btn btn-primary w-100">
                  Upload Project
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;