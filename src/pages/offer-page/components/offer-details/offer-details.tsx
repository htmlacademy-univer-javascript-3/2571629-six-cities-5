import { Offer, OfferPreview } from '../../../../types/offer';
import { capitalize } from '../../../../utils/common';
import { getStarRatingPercentage } from '../../../../utils/offer';
import { ReviewForm } from '../review-form/review-form';
import { ReviewList } from '../review-list/review-list';
import { Map } from '../../../../components/map/map';
import { Review } from '../../../../types/review';
import { AppRoute, AuthorizationStatus, MAX_OFFER_IMAGES_COUNT } from '../../../../const';
import { useAppSelector } from '../../../../hooks/use-app-selector';
import { getAuthorizationStatus } from '../../../../store/user-data/selectors';
import { redirectToRoute } from '../../../../store/action';
import { changeFavoriteStatus } from '../../../../store/api-actions';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch';
import { setOffer } from '../../../../store/offer-data/offer-data';

type OffersDetailsProps = {
  offer: Offer;
  offersNearby: OfferPreview[];
  offerReviews: Review[];
};

function OffersDetails({ offer, offersNearby, offerReviews }: OffersDetailsProps): JSX.Element {
  const images = offer.images.slice(0, MAX_OFFER_IMAGES_COUNT);
  const {id, isFavorite, isPremium, title, rating, type, maxAdults, bedrooms, price, goods, description, city, host} = offer;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const handleToBookmarksClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }
    dispatch(changeFavoriteStatus({ offerId: id, status: isFavorite ? 0 : 1 }));
    const updatedOffer = { ...offer, isFavorite: !isFavorite };
    dispatch(setOffer(updatedOffer));
  }, [authorizationStatus, offer, id, isFavorite, dispatch]);

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {images.map((image, index) => (
            // eslint-disable-next-line
            <div className="offer__image-wrapper" key={index}>
              <img className="offer__image" src={image} alt="Photo studio" />
            </div>
          ))}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {title}
            </h1>
            <button
              className={`offer__bookmark-button button${authorizationStatus === AuthorizationStatus.Auth && isFavorite
                ? ' offer__bookmark-button--active'
                : ''}`}
              type="button"
              onClick={handleToBookmarksClick}
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{width: getStarRatingPercentage(rating)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {capitalize(type)}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {`${bedrooms} Bedrooms`}
            </li>
            <li className="offer__feature offer__feature--adults">
              {`Max ${maxAdults} adults`}
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {goods.map((good) => (
                <li className="offer__inside-item" key={good}>
                  {good}
                </li>
              ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
              </div>
              <span className="offer__user-name">
                {host.name}
              </span>
              {host.isPro && (
                <span className="offer__user-status">
                  Pro
                </span>
              )}
            </div>
            <div className="offer__description">
              <p className="offer__text" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
          <section className="offer__reviews reviews">
            <h2 className="reviews__title">
              Reviews &middot; <span className="reviews__amount">{offerReviews.length}</span>
            </h2>
            <ReviewList reviews={offerReviews}/>
            {authorizationStatus === AuthorizationStatus.Auth && (
              <ReviewForm offerId={id}/>
            )}
          </section>
        </div>
      </div>
      <section className="offer__map map">
        <Map
          block="offer"
          location={city.location}
          offers={offersNearby.concat(offer)}
          activeOfferId={id}
        />
      </section>
    </section>
  );
}

export default OffersDetails;
