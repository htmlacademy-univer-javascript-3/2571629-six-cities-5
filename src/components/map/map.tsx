import { Icon, layerGroup, Marker } from 'leaflet';
import { Location } from '../../types/location';
import { OfferPreview } from '../../types/offer';
import { memo, useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';

type MapProps = {
  block: string;
  location: Location;
  offers: OfferPreview[];
  activeOfferId: OfferPreview['id'] | null;
};

type IconConfig = {
  url: string;
  width: number;
  height: number;
  anchorX: number;
  anchorY: number;
};

const defaultIconConfig: IconConfig = {
  url: '/img/pin.svg',
  width: 28,
  height: 40,
  anchorX: 14,
  anchorY: 40
};

const activeIconConfig: IconConfig = {
  url: '/img/pin-active.svg',
  width: 28,
  height: 40,
  anchorX: 14,
  anchorY: 40
};

function createIcon(iconConfig: IconConfig) {
  return new Icon({
    iconUrl: iconConfig.url,
    iconSize: [iconConfig.width, iconConfig.height],
    iconAnchor: [iconConfig.anchorX, iconConfig.anchorY]
  });
}

function MapComponent({ block, location, offers, activeOfferId }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [map, location]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            offer.id === activeOfferId
              ? createIcon(activeIconConfig)
              : createIcon(defaultIconConfig)
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeOfferId]);

  return <section className={`${block}__map map`} ref={mapRef} />;
}

export const Map = memo(MapComponent);
