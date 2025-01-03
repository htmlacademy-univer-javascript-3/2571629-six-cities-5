import { ChangeEvent, FormEvent, Fragment, memo, useCallback, useState } from 'react';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../../../const';
import { toast } from 'react-toastify';
import { sendReview } from '../../../../store/api-actions';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch';

const ratingMap = {
  '1': 'terribly',
  '2': 'badly',
  '3': 'not bad',
  '4': 'good',
  '5': 'perfect'
};

type ReviewFormProps = {
  offerId: string;
}

function ReviewFormComponent({offerId}: ReviewFormProps): JSX.Element {
  const [data, setData] = useState({comment: '', rating: ''});
  const [isSending, setIsSending] = useState(false);
  const isValid =
    !isSending &&
    data.comment.length >= MIN_COMMENT_LENGTH &&
    data.comment.length <= MAX_COMMENT_LENGTH &&
    data.rating !== '';
  const dispatch = useAppDispatch();

  const handleTextareaChange = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    setData((state) => ({ ...state, comment: evt.target.value }));
  }, []);

  const handleInputChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setData((state) => ({ ...state, rating: evt.target.value }));
  }, []);

  const handleSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault();
    setIsSending(true);
    const {rating, comment} = data;

    if (!isValid) {
      toast.warning('The review must contain rating and comment must be from 50 to 300 characters');
      return;
    }

    dispatch(sendReview({offerId, comment, rating: Number(rating)}))
      .then(() => {
        setData({rating: '', comment: ''});
        setIsSending(false);
      });
  }, [offerId, data, isValid, dispatch]);

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .sort(([firstScore,], [secondScore,]) => Number(secondScore) - Number(firstScore))
          .map(([score, title]) => (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={`${score}-stars`}
                type="radio"
                checked={data.rating === score}
                onChange={handleInputChange}
              />
              <label
                htmlFor={`${score}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={data.comment}
        onChange={handleTextareaChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay{' '}
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_COMMENT_LENGTH} characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export const ReviewForm = memo(ReviewFormComponent);
