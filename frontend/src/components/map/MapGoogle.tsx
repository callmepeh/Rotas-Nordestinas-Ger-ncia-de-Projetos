import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface MapGoogleProps {
  city: string;
  state: string;
}

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
};

export const MapGoogle: React.FC<MapGoogleProps> = ({ city, state }) => {
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);

  // Carrega o script da API
//   console.log("Google API Key:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"], // opcional, mas ajuda o geocoder
  });

  useEffect(() => {
    if (!isLoaded) return;

    const geocoder = new window.google.maps.Geocoder();
    const address = `${city}, ${state}, Brasil`;

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        setCenter({
          lat: location.lat(),
          lng: location.lng(),
        });
      } else {
        console.error("Erro ao obter coordenadas:", status);
      }
    });
  }, [isLoaded, city, state]);

  if (loadError) return <p>Erro ao carregar o mapa</p>;
  if (!isLoaded) return <p>Carregando mapa...</p>;
  if (!center) return <p>Localizando cidade...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};
