import React from 'react';

export default function MapComponent({ location }) {
  return (
    <iframe
      width="100%"
      height="100%"
      frameBorder="0"
      style={{ border: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.005}%2C${location.latitude - 0.005}%2C${location.longitude + 0.005}%2C${location.latitude + 0.005}&layer=mapnik&marker=${location.latitude}%2C${location.longitude}`}
      allowFullScreen
    />
  );
}
