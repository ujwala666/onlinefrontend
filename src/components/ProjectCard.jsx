import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { toggleFavorite } from "../features/favoriteSlice";
import { toast } from "react-toastify";

const ProjectCard = ({ project }) => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const favorites = useSelector(
    (state) => state.favorites.favorites
  );

  const isFavorite = favorites.some(
    (item) => item.id === project.id
  );

  const handleFavorite = () => {
    if (!isAuthenticated) {
      toast.warning("Please login first!");
      return;
    }

    dispatch(toggleFavorite(project));

    if (isFavorite) {
      toast.info("Removed from Favorites");
    } else {
      toast.success("Added to Favorites");
    }
  };

  return (
    <div className="card h-100 shadow border-0">

      <img
        src={project.image}
        className="card-img-top"
        alt={project.title}
        style={{
          height: "220px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">

        <div className="d-flex justify-content-between align-items-center mb-2">

          <span className="badge bg-primary">
            {project.category}
          </span>

          <button
            className="btn btn-sm"
            onClick={handleFavorite}
          >
            {isFavorite ? (
              <FaHeart color="red" size={20} />
            ) : (
              <FaRegHeart size={20} />
            )}
          </button>

        </div>

        <h5 className="fw-bold">
          {project.title}
        </h5>

        <p className="text-muted">
          By <strong>{project.author}</strong>
        </p>

        <p className="text-secondary flex-grow-1">
          {project.description.length > 100
            ? project.description.slice(0, 100) + "..."
            : project.description}
        </p>

        <div className="d-flex justify-content-between align-items-center mt-3">

          <span className="text-warning fw-bold">
            <FaStar /> {project.rating || 0}
          </span>

          <Link
            to={`/project/${project.id}`}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ProjectCard;