import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [stats, setStats] = useState({
    users: 0,
    projects: 0,
    reviews: 0,
    comments: 0,
    myProjects: 0,
    favorites: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [users, projects, reviews, comments] = await Promise.all([
        axios.get("https://onlinebackend-wv8o.onrender.com/users"),
        axios.get("https://onlinebackend-wv8o.onrender.com/projects"),
        axios.get("https://onlinebackend-wv8o.onrender.com/reviews"),
        axios.get("https://onlinebackend-wv8o.onrender.com/comments"),
      ]);

      setStats({
        users: users.data.length,
        projects: projects.data.length,
        reviews: reviews.data.length,
        comments: comments.data.length,
        myProjects: projects.data.filter(
          (project) => project.userId === user?.id
        ).length,
        favorites:
          JSON.parse(localStorage.getItem("favorites"))?.length || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">
        Welcome, {user?.name}
      </h2>

      <div className="row g-4">
        {user?.role === "admin" ? (
          <>
            <div className="col-md-3">
              <div className="card shadow text-center">
                <div className="card-body">
                  <h3>{stats.users}</h3>
                  <p>Total Users</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow text-center">
                <div className="card-body">
                  <h3>{stats.projects}</h3>
                  <p>Total Projects</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow text-center">
                <div className="card-body">
                  <h3>{stats.reviews}</h3>
                  <p>Total Reviews</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow text-center">
                <div className="card-body">
                  <h3>{stats.comments}</h3>
                  <p>Total Comments</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-md-4">
              <div className="card shadow text-center">
                <div className="card-body">
                  <h3>{stats.myProjects}</h3>
                  <p>My Projects</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow text-center">
                <div className="card-body">
                  <h3>{stats.favorites}</h3>
                  <p>Favorite Projects</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow text-center">
                <div className="card-body">
                  <h3>{stats.reviews}</h3>
                  <p>Total Community Reviews</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-5">
        <div className="card shadow">
          <div className="card-body">
            <h4>About Dashboard</h4>

            <p>
              This dashboard provides an overview of platform activity.
              Users can monitor their contributions, while administrators
              can track overall platform statistics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;