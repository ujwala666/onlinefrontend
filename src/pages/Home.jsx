import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "https://onlinebackend-wv8o.onrender.com/projects"
      );
      setProjects(res.data.slice(0, 6));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold">
                CollabSpace
              </h1>

              <h4 className="mb-4">
                Where Ideas Meet Innovation
              </h4>

              <p className="lead">
                Turn your ideas into reality by showcasing your projects,
                discovering innovative creations, connecting with passionate
                creators, and collaborating through meaningful feedback that
                helps every idea reach its full potential.
              </p>

              <Link
                to="/projects"
                className="btn btn-light btn-lg mt-3"
              >
                Explore Projects
              </Link>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
                alt="Collaboration"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Featured Projects
          </h2>

          <p className="text-muted">
            Discover innovative projects shared by our community.
          </p>
        </div>

        <div className="row g-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="col-md-6 col-lg-4"
              >
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <h5 className="text-center text-muted">
              No Projects Found
            </h5>
          )}
        </div>

        <div className="text-center mt-5">
          <Link
            to="/projects"
            className="btn btn-primary"
          >
            View All Projects
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Why Choose CollabSpace?
            </h2>
          </div>

          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3>🚀</h3>
                  <h5>Showcase Projects</h5>
                  <p>
                    Upload and share your innovative work with creators
                    from around the world.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3>💬</h3>
                  <h5>Get Feedback</h5>
                  <p>
                    Receive valuable reviews and suggestions to improve
                    your projects.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3>🤝</h3>
                  <h5>Collaborate</h5>
                  <p>
                    Connect with creators, exchange ideas, and build
                    amazing solutions together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;