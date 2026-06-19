const CommentCard = ({ comment }) => {
  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-2">

          <div>
            <h6 className="fw-bold mb-0">
              {comment.userName}
            </h6>

            <small className="text-muted">
              {comment.date}
            </small>
          </div>

        </div>

        <p className="mb-0 text-secondary">
          {comment.message}
        </p>

      </div>
    </div>
  );
};

export default CommentCard;