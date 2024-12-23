import {Fragment, useState} from 'react';
import {OffersList} from './OffersList.tsx';
import {CardMock, Point} from '../mocks/MockHelpers.ts';
import {Map} from './Map.tsx';
import {CITY} from '../mocks/city.ts';
import {Offers} from '../mocks/offers.ts';

type MainProps = {
  placesToStayCount: number;
  offers: Array<CardMock>;
}

export function Main({placesToStayCount, offers}: MainProps) {
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const handleListItemHover = (lastTitle: string) => {
    const currentPoint = Offers.map((x) => x.point).find((cardMock) =>
      cardMock.title === lastTitle,
    );
    setSelectedPoint(currentPoint || null);
  };

  return (
    <Fragment>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Paris</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Cologne</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Brussels</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item tabs__item--active">
                <span>Amsterdam</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Hamburg</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Dusseldorf</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{placesToStayCount} places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                    Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <OffersList mocks={offers} onListItemHover={handleListItemHover}/>
          </section>
          <div className="cities__right-section">
            <section className="map">
              <Map city={CITY} points={Offers.map((x) => x.point)} selectedPoint={selectedPoint}/>
            </section>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
