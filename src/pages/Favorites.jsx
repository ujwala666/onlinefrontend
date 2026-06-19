import { useSelector, useDispatch } from "react-redux";
import { clearFavorites } from "../features/favoriteSlice";
import { toast } from "react-toastify";
import ProjectCard from "../components/ProjectCard";

const Favorites = () => {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.favorites.favorites
  );

  const handleClearFavorites = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to remove all favorites?"
    );

    if (!confirmClear) return;

    dispatch(clearFavorites());

    toast.success("Favorites cleared successfully");
  };

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Favorite Projects</h2>

        {favorites.length > 0 && (
          <button
            className="btn btn-danger"
            onClick={handleClearFavorites}
          >
            Clear Favorites
          </button>
        )}

      </div>

      {favorites.length === 0 ? (
        <div className="alert alert-info">
          No favorite projects found.
        </div>
      ) : (
        <div className="row g-4">

          {favorites.map((project) => (
            <div
              key={project.id}
              className="col-md-6 col-lg-4"
            >
              <ProjectCard project={project} />
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Favorites;