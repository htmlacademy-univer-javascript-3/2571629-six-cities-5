import { memo } from 'react';
import { CityName } from '../../../../const';

type CitiesListProps = {
  cities: CityName[];
  activeCityName: CityName;
  onChangeCity: (city: CityName) => void;
};

function CitiesListComponent({ cities, activeCityName, onChangeCity }: CitiesListProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={`locations__item-link tabs__item ${city === activeCityName ? 'tabs__item--active' : ''}`}
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                onChangeCity(city);
              }}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const CitiesList = memo(CitiesListComponent);
