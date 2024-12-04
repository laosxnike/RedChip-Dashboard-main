import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationData {
  latitude: number;
  longitude: number;
  count: number;
}

interface UserLocationHeatmapProps {
  locations: LocationData[];
}

const UserLocationHeatmap: React.FC<UserLocationHeatmapProps> = ({ locations }) => {
  // Calculate the center of the map based on the locations
  const center = [
    locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length || 0,
    locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length || 0,
  ];

  return (
    <MapContainer center={center} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc, index) => (
        <Marker key={index} position={[loc.latitude, loc.longitude]}>
          <Popup>
            Count: {loc.count}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default UserLocationHeatmap; 