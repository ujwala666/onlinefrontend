import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState({
    title: "",
    category: "",
    image: "",
    github: "",
    demo: "",
    description: "",
  });

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await axios.get(
        `https://onlinebackend-wv8o.onrender.com/projects/${id}`
      );

      setProject(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load project");
    }
  };

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

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

    try {
      await axios.put(
        `https://onlinebackend-wv8o.onrender.com/projects/${id}`,
        project
      );

      toast.success("Project Updated Successfully");

      navigate("/my-projects");
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">
                Edit Project
              </h2>

              <form onSubmit={handleUpdate}>
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

                <button className="btn btn-success w-100">
                  Update Project
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProject;