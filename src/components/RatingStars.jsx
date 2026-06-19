import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-warning me-1" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-warning me-1" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-warning me-1" />);
    }
  }

  return (
    <div className="d-flex align-items-center">
      {stars}
      <span className="ms-2 text-muted">
        ({rating})
      </span>
    </div>
  );
};

export default RatingStars;