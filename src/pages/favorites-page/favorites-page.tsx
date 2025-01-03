import { Helmet } from 'react-helmet-async';
import { OfferPreview } from '../../types/offer';
import { PlaceCard } from '../../components/place-card/place-card';
import { Header } from '../../components/header/header';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useMemo } from 'react';
import { getFavorites } from '../../store/user-data/selectors';
import EmptyFavorites from './empty-favorites/empty-favorites';

function getFavoritesByCity(favorites: OfferPreview[]) {
  return favorites.reduce<{ [key: string]: OfferPreview[] }>((acc, current) => {
    const city = current.city.name;

    if (!(city in acc)) {
      acc[city] = [];
    }
    acc[city].push(current);

    return acc;
  }, {});
}

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(getFavorites);
  const favoritesByCity = useMemo(() => getFavoritesByCity(offers), [offers]);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites.</title>
      </Helmet>
      <Header />
      {offers.length === 0 ? <EmptyFavorites /> :
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(favoritesByCity).map(
                  ([city, groupedFavorites]) => (
                    <li className="favorites__locations-items" key={city}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <div className="locations__item-link">
                            <span>{city}</span>
                          </div>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {groupedFavorites.map((offer) => (
                          <PlaceCard
                            key={offer.id}
                            offer={offer}
                            block="favorites"
                            imageSize="little"
                          />
                        ))}
                      </div>
                    </li>
                  )
                )}
              </ul>
            </section>
          </div>
        </main>}
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
