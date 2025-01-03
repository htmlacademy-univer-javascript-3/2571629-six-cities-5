import { memo } from 'react';
import { MAX_REVIEWS_COUNT } from '../../../../const';
import { Review } from '../../../../types/review';
import { ReviewCard } from '../review-card/review-card';

type ReviewListProps = {
  reviews: Review[] | undefined;
};

function ReviewListComponent({ reviews }: ReviewListProps): JSX.Element {
  if (!reviews || reviews.length === 0) {
    return <p style={{ textAlign: 'center', fontSize: '20px' }}>Be the first to leave your review!</p>;
  }

  const sortedReviews = reviews
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEWS_COUNT);

  return (
    <ul className="reviews__list">
      {sortedReviews.map((review) => (
        <ReviewCard key={review.id} review={review}/>
      ))}
    </ul>
  );
}

export const ReviewList = memo(ReviewListComponent);
