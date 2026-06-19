import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const MyProjects = () => {
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `https://onlinebackend-wv8o.onrender.com/projects?userId=${user.id}`
      );

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://onlinebackend-wv8o.onrender.com/projects/${id}`
      );

      toast.success("Project Deleted Successfully");

      fetchProjects();
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete project");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Projects</h2>

        <Link
          to="/add-project"
          className="btn btn-primary"
        >
          Add New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="alert alert-info">
          You haven't uploaded any projects yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <img
                      src={project.image}
                      alt={project.title}
                      width="80"
                      height="60"
                      style={{ objectFit: "cover" }}
                    />
                  </td>

                  <td>{project.title}</td>

                  <td>{project.category}</td>

                  <td>{project.rating}</td>

                  <td>
                    <Link
                      to={`/edit-project/${project.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteProject(project.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyProjects;