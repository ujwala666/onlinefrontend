import { Circles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReviewCard from "../components/ReviewCard";
import CommentCard from "../components/CommentCard";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState({});
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);

  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);

  const currentUser =
    JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      await Promise.all([
        fetchProject(),
        fetchReviews(),
        fetchComments(),
      ]);

      setLoading(false);
    };

    loadData();
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await axios.get(
        `https://onlinebackend-wv8o.onrender.com/projects/${id}`
      );
      setProject(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `https://onlinebackend-wv8o.onrender.com/reviews?projectId=${id}`
      );
      setReviews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `https://onlinebackend-wv8o.onrender.com/comments?projectId=${id}`
      );
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.warning("Please login first");
      return;
    }

    if (!rating || !review) {
      toast.error("Please fill all fields");
      return;
    }

    const newReview = {
      projectId: id,
      userId: currentUser.id,
      userName: currentUser.name,
      rating: Number(rating),
      comment: review,
      date: new Date().toLocaleDateString(),
    };

    await axios.post(
      "https://onlinebackend-wv8o.onrender.com/reviews",
      newReview
    );

    toast.success("Review Added");

    setRating("");
    setReview("");

    fetchReviews();
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.warning("Please login first");
      return;
    }

    if (!comment) {
      toast.error("Comment cannot be empty");
      return;
    }

    const newComment = {
      projectId: id,
      userId: currentUser.id,
      userName: currentUser.name,
      message: comment,
      date: new Date().toLocaleDateString(),
    };

    await axios.post(
      "https://onlinebackend-wv8o.onrender.com/comments",
      newComment
    );

    toast.success("Comment Added");

    setComment("");

    fetchComments();
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="row">

        <div className="col-lg-6">
          <img
            src={project.image}
            alt={project.title}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-lg-6">

          <h2>{project.title}</h2>

          <p className="text-muted">
            By {project.author}
          </p>

          <span className="badge bg-primary mb-3">
            {project.category}
          </span>

          <p>{project.description}</p>

          <div className="mb-3">

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark me-2"
            >
              GitHub
            </a>

            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="btn btn-success"
            >
              Live Demo
            </a>

          </div>

        </div>

      </div>

      <hr className="my-5" />

      <div className="row">

        <div className="col-lg-6">

          <h3>Write a Review</h3>

          <form onSubmit={handleReview}>

            <input
              type="number"
              min="1"
              max="5"
              className="form-control mb-3"
              placeholder="Rating (1-5)"
              value={rating}
              onChange={(e) =>
                setRating(e.target.value)
              }
            />

            <textarea
              rows="4"
              className="form-control mb-3"
              placeholder="Write your review..."
              value={review}
              onChange={(e) =>
                setReview(e.target.value)
              }
            />

            <button className="btn btn-primary">
              Submit Review
            </button>

          </form>

        </div>

        <div className="col-lg-6">

          <h3>Reviews</h3>

          {reviews.length > 0 ? (
            reviews.map((item) => (
              <ReviewCard
                key={item.id}
                review={item}
              />
            ))
          ) : (
            <p>No Reviews Yet</p>
          )}

        </div>

      </div>

      <hr className="my-5" />

      <div className="row">

        <div className="col-lg-6">

          <h3>Add Comment</h3>

          <form onSubmit={handleComment}>

            <textarea
              rows="4"
              className="form-control mb-3"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
            />

            <button className="btn btn-primary">
              Post Comment
            </button>

          </form>

        </div>

        <div className="col-lg-6">

          <h3>Comments</h3>

          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                key={item.id}
                comment={item}
              />
            ))
          ) : (
            <p>No Comments Yet</p>
          )}

        </div>

      </div>

    </div>
  );
};

export default ProjectDetails;