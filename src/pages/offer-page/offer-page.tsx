import { Helmet } from 'react-helmet-async';
import { MAX_NEARBY_OFFERS_COUNT } from '../../const';
import { useParams } from 'react-router-dom';
import OfferDetails from './components/offer-details/offer-details';
import { Header } from '../../components/header/header';
import { NearbyOffersList } from './components/nearby-offers-list/nearby-offers-list';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useEffect } from 'react';
import { fetchOfferPageInformation } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import Spinner from '../../components/spinner/spinner';
import { getOffer, getOfferPageDataLoadingStatus, getOffersNearby, getReviews } from '../../store/offer-data/selectors';

function OfferPage(): JSX.Element {
  const { offerId } = useParams();
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getOffer);
  const offersNearby = useAppSelector(getOffersNearby).slice(0, MAX_NEARBY_OFFERS_COUNT);
  const offerReviews = useAppSelector(getReviews);
  const isOfferPageDataLoading = useAppSelector(getOfferPageDataLoadingStatus);

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferPageInformation(offerId));
    }
  }, [offerId, dispatch]);

  if (!offer || isOfferPageDataLoading) {
    return <Spinner />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>{`6 cities. ${offer.title}.`}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <OfferDetails
          offer={offer}
          offersNearby={offersNearby}
          offerReviews={offerReviews}
        />
        <div className="container">
          <NearbyOffersList offers={offersNearby}/>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
