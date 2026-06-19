import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [search, category, projects]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "https://onlinebackend-wv8o.onrender.com/projects"
      );
      setProjects(res.data);
      setFilteredProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterProjects = () => {
    let data = [...projects];

    if (search.trim() !== "") {
      data = data.filter((project) =>
        project.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      data = data.filter(
        (project) => project.category === category
      );
    }

    setFilteredProjects(data);
  };

  return (
    <div className="container py-5">

      <div className="text-center mb-4">
        <h2 className="fw-bold">Community Projects</h2>
        <p className="text-muted">
          Explore amazing projects created by innovators around the world.
        </p>
      </div>

      <div className="row mb-4">

        <div className="col-md-8 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Web Development</option>
            <option>Mobile App</option>
            <option>Artificial Intelligence</option>
            <option>Machine Learning</option>
            <option>UI/UX</option>
            <option>Cyber Security</option>
            <option>Blockchain</option>
            <option>Cloud Computing</option>
          </select>
        </div>

      </div>

      <div className="row g-4">

        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              className="col-md-6 col-lg-4"
              key={project.id}
            >
              <ProjectCard project={project} />
            </div>
          ))
        ) : (
          <h4 className="text-center text-muted">
            No Projects Found
          </h4>
        )}

      </div>

    </div>
  );
};

export default Projects;