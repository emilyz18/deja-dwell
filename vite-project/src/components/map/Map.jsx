import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'

const vancouver = {
  lat: 49.246292,
  lng: -123.116226,
}

const MapComponent = ({propertyAddresses}) => {
  const mapContainerRef = useRef(null);
  const [lat, setLat] = useState(vancouver.lat);
  const [lng, setLng] = useState(vancouver.lng);
  const [zoom, setZoom] = useState(10);

  mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbHl6MTgiLCJhIjoiY2x6MHh1bm02MWIwODJrb3I0aDl0dWxpYyJ9.sNVwa6RZKijr8TQtEmIPdA';

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    

    return () => map.remove();
  }, []);

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default MapComponent;
