import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import supercluster from 'supercluster';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'; // Import the Geocoder CSS
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
  const [clusters, setClusters] = useState([]);

  const [map, setMap] = useState(null);

  mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbHl6MTgiLCJhIjoiY2x6MHo0MzFsMHUzZzJxcG56aWxzdzh1aSJ9.B1UOVT6KppcwDPErWhrBZg';



  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    propertyAddresses.forEach(async (propertyAddress) => {
      let { street, city, province } = propertyAddress
      if (!street) street = ''
      if (!city) city = ''
      if (!province) province = ''
  
      const address = `${street}, ${city}, ${province}`
      // Fetch coordinates for the address
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`);
      const data = await response.json();
      const [longitude, latitude] = data.features[0].geometry.coordinates;
  
      // Create a marker for the address
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    });
    return () => map.remove();
  }, [propertyAddresses]);

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default MapComponent;
