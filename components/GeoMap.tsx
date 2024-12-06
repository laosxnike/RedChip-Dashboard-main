import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

const GeoMap: React.FC<{ data: any }> = ({ data }) => {
  const center: LatLngExpression = [51.505, -0.09];

  return (
    <MapContainer 
      center={center} 
      zoom={2} 
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((location: any, index: number) => (
        <CircleMarker
          key={index}
          center={[location.latitude, location.longitude]}
          radius={10}
          color="blue"
        >
          <Popup>
            {location.city}, {location.country}: {location.visitors} visitors
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default GeoMap; 