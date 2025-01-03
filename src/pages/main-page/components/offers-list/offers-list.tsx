import { OfferPreview } from '../../../../types/offer';
import { PlaceCard } from '../../../../components/place-card/place-card';
import { memo } from 'react';

type OffersListProps = {
  offers: OfferPreview[];
  block: string;
  onMouseOver?: (offerId: string) => void;
  onMouseLeave?: () => void;
};

function OffersListComponent({ offers, block, onMouseOver, onMouseLeave }: OffersListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          block={block}
          onMouseOver={() => onMouseOver?.(offer.id)}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </>
  );
}

export const OffersList = memo(OffersListComponent);
