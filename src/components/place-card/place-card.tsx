import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { OfferPreview } from '../../types/offer';
import { capitalize } from '../../utils/common';
import { getStarRatingPercentage } from '../../utils/offer';
import { memo, useCallback } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { changeFavoriteStatus } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import { redirectToRoute } from '../../store/action';

type PlaceCardImageSize = 'little' | 'big';

type PlaceCardProps = {
  offer: OfferPreview;
  block: string;
  imageSize?: PlaceCardImageSize;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
};

const sizeMap: Record<PlaceCardImageSize, { width: string; height: string }> = {
  little: { width: '150', height: '110' },
  big: { width: '260', height: '200' }
};

function PlaceCardComponent({ offer, block, imageSize = 'big', onMouseOver, onMouseLeave }: PlaceCardProps): JSX.Element {
  const { id, title, type, price, isPremium, rating, previewImage, isFavorite } = offer;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const handleToBookmarksClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }
    dispatch(changeFavoriteStatus({ offerId: id, status: isFavorite ? 0 : 1 }));
  }, [authorizationStatus, isFavorite, id, dispatch]);

  return (
    <article
      className={`${block}__card place-card`}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            alt={title}
            {...sizeMap[imageSize]}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button${authorizationStatus === AuthorizationStatus.Auth && isFavorite
              ? ' place-card__bookmark-button--active'
              : ''}`}
            type="button"
            onClick={handleToBookmarksClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getStarRatingPercentage(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

export const PlaceCard = memo(PlaceCardComponent);
