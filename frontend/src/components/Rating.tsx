const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="rating pointer-events-none">
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        checked={rating == 1}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        checked={rating == 2}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        checked={rating == 3}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        checked={rating == 4}
      />
      <input
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-orange-400"
        checked={rating == 5}
      />
    </div>
  );
};

export default Rating;
