import { memo } from 'react';
import { Review } from '../../../../types/review';
import { formatDate } from '../../../../utils/common';
import { getStarRatingPercentage } from '../../../../utils/offer';

type ReviewCardProps = {
  review: Review;
};

function ReviewCardComponent({ review }: ReviewCardProps): JSX.Element {
  const { user, rating, comment, date } = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt={user.name}
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: getStarRatingPercentage(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>{formatDate(date)}</time>
      </div>
    </li>
  );
}

export const ReviewCard = memo(ReviewCardComponent);
