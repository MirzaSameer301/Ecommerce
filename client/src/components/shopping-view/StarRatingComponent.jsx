import React from "react";
import { FaStar } from "react-icons/fa6";

const StarRatingComponent = ({ rating, handleRatingChange }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          className={`p-1 rounded-full transition-colors ${
            star <= rating
              ? "text-yellow-500 hover:bg-black"
              : "text-black hover:bg-primary hover:text-primary-foreground"
          }`}
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        >
          <FaStar />
        </button>
      ))}
    </div>
  );
};

export default StarRatingComponent;
