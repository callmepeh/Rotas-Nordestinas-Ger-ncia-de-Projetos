import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Corrige o problema com o ícone do marcador que não aparece por padrão
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


interface LeafletMapProps {
  latitude: number;
  longitude: number;
  popupText?: string;
}

export const LeafletMap = ({ latitude, longitude, popupText }: LeafletMapProps) => {
  
  if (latitude === undefined || longitude === undefined) {
    return <div>Carregando mapa...</div>;
  }

  const position: [number, number] = [latitude, longitude];

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        {popupText && <Popup>{popupText}</Popup>}
      </Marker>
    </MapContainer>
  );
};