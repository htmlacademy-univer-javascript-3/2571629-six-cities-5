import { useState } from 'react';
import { SortingOptions } from '../../../../const';

type OffersFilterProps = {
  activeOption: SortingOptions;
  onChange: (sortingOption: SortingOptions) => void;
}

function OffersFilter({activeOption, onChange}: OffersFilterProps): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleFilterClick = () => {
    setIsVisible((wasVisible) => !wasVisible);
  };

  const handleOptionClick = (option: SortingOptions) => {
    onChange(option);
    setIsVisible(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleFilterClick}
      >
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isVisible ? ' places__options--opened' : ''}`}>
        {Object.values(SortingOptions).map((option) => (
          <li
            key={option}
            className={`places__option${option === activeOption ? ' places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default OffersFilter;
