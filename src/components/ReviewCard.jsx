import RatingStars from "./RatingStars";

const ReviewCard = ({ review }) => {
  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center">

          <div>
            <h5 className="mb-1">{review.userName}</h5>
            <small className="text-muted">
              {review.date}
            </small>
          </div>

          <RatingStars rating={review.rating} />

        </div>

        <hr />

        <p className="mb-0 text-secondary">
          {review.comment}
        </p>

      </div>
    </div>
  );
};

export default ReviewCard;