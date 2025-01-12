import { useState } from 'react';
import { useMovies } from '../context/MovieContext';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

export default function ReviewSection({ movieId }) {
  const { userReviews, addReview, getAverageRating } = useMovies();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const movieReviews = userReviews[movieId] || [];
  const averageRating = getAverageRating(movieId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;

    addReview(movieId, {
      rating,
      comment,
      date: new Date().toISOString()
    });

    setRating(0);
    setComment('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Review Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Your Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                {star <= (hoveredRating || rating) ? (
                  <StarIcon className="h-6 w-6 text-yellow-400" />
                ) : (
                  <StarOutlineIcon className="h-6 w-6 text-gray-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            Your Review
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
            placeholder="Write your review here..."
          />
        </div>

        <button
          type="submit"
          disabled={rating === 0}
          className="px-4 py-2 bg-accent-light dark:bg-accent-dark text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Reviews {movieReviews.length > 0 && `(${movieReviews.length})`}
        </h3>

        {movieReviews.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="font-medium">Average Rating:</span>
            <div className="flex items-center">
              <span className="mr-2">{averageRating}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {movieReviews.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No reviews yet. Be the first to review this movie!
          </p>
        ) : (
          <div className="space-y-4">
            {movieReviews.map((review, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-5 w-5 ${
                        star <= review.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                {review.comment && (
                  <p className="text-gray-700 dark:text-gray-300">
                    {review.comment}
                  </p>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(review.date)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
