import { Helmet } from 'react-helmet-async';
import { OfferPreview } from '../../types/offer';
import { OffersList } from './components/offers-list/offers-list';
import { Header } from '../../components/header/header';
import { Map } from '../../components/map/map';
import { useCallback, useMemo, useState } from 'react';
import OffersFilter from './components/offers-filter/offers-filter';
import { getWordEndingByCount } from '../../utils/common';
import { getSortedOfferPreviews } from '../../utils/offer';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { Cities, CityName, SortingOptions } from '../../const';
import { CitiesList } from './components/cities-list/cities-list';
import { getActiveCity } from '../../store/active-city-data/selectors';
import { getOffers } from '../../store/offers-data/selectors';
import { setActiveCity } from '../../store/active-city-data/active-city-data';
import EmptyOfferList from './components/empty-offer-list/empty-offer-list';

function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<OfferPreview['id'] | null>(null);
  const [activeSortingOption, setActiveSortingOption] = useState<SortingOptions>(SortingOptions.Popular);
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);

  const sortedOffers = useMemo(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === activeCity.name);
    return getSortedOfferPreviews(filteredOffers, activeSortingOption);
  }, [offers, activeCity, activeSortingOption]);

  const handleChangeCity = useCallback((cityName: CityName) => {
    dispatch(setActiveCity(Cities[cityName]));
  }, [dispatch]);

  const onSortingOptionChange = useCallback((option : SortingOptions) => {
    setActiveSortingOption(option);
  }, []);

  const onMouseOverOffer = useCallback(setActiveOfferId, [setActiveOfferId]);
  const onMouseLeaveOffer = useCallback(() => setActiveOfferId(null), []);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities.</title>
      </Helmet>
      <Header />
      <main className={`page__main page__main--index${offers.length === 0 ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList
            cities={Object.values(CityName)}
            activeCityName={activeCity.name}
            onChangeCity={handleChangeCity}
          />
        </div>
        <div className="cities">
          {offers.length === 0 ? <EmptyOfferList activeCityName={activeCity.name} /> :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortedOffers.length} place{getWordEndingByCount(sortedOffers.length)} to stay in {activeCity.name}</b>
                <OffersFilter
                  activeOption={activeSortingOption}
                  onChange={onSortingOptionChange}
                />
                <div className="cities__places-list places__list tabs__content">
                  <OffersList
                    offers={sortedOffers}
                    block="cities"
                    onMouseOver={onMouseOverOffer}
                    onMouseLeave={onMouseLeaveOffer}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                <Map
                  block="cities"
                  offers={sortedOffers}
                  location={activeCity.location}
                  activeOfferId={activeOfferId}
                />
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
