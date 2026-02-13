import { useState } from "react";
import { useRatingStore } from "../store/ratingStore";

const RatingBox = ({ bookingId }) => {
  const [rating, setRating] = useState(5);
  const { submitRating } = useRatingStore();

  return (
    <div className="mt-2 border-t pt-2">
      <div>Rate this job</div>

      <select
        className="select select-bordered select-sm"
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>

      <button
        className="btn btn-sm btn-primary ml-2"
        onClick={() =>
          submitRating({ bookingId, rating })
        }
      >
        Submit
      </button>
    </div>
  );
};

export default RatingBox;
