import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";

type Store = {
  latitude: string;
  longitude: string;
  name: string;
};

type MapProps = {
  stores: Store[];
};

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function Map({ stores }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // setting the center of map view based on dropdown selection, by default it is set to Delhi location on initial load
  //  and if the dropdown change then setting center to first store longitude & latitude
  const center = useMemo(() => {
    if (stores.length > 0) {
      const lat = parseFloat(stores[0].latitude);
      const lng = parseFloat(stores[0].longitude);
      return { lat, lng };
    }
    return { lat: 28.6139, lng: 77.209 };
  }, [stores]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {stores.map((store, idx) => (
        <Marker
          key={idx}
          position={{
            lat: parseFloat(store.latitude),
            lng: parseFloat(store.longitude),
          }}
          title={store.name}
        />
      ))}
    </GoogleMap>
  );
}
