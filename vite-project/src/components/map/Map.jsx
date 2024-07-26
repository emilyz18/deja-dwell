import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useState, useRef, useEffect } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import './Map.css';

const vancouver = {
  lat: 49.246292,
  lng: -123.116226,
};

const mapStyles = [
  {
    "featureType": "poi.medical",
    "elementType": "labels",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "poi.business",
    "elementType": "labels",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "poi.attraction",
    "elementType": "labels",
    "stylers": [{ "visibility": "off" }]
  },
];


function Map({ propertyAddresses,  zoomMapProperty}) {
  // console.log("zoom property: " + zoomMapProperty)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBLFCLKvngrnl7PBEZczkzLJbObWvJDScM',
  });

  const [markers, setMarkers] = useState([]);
  const [isZoom, setIsZoom] = useState(false);

  const mapRef = useRef();
  const [center, setCenter] = useState(vancouver);
  const markersRef = useRef([]);
  const markerClusterRef = useRef();
  const geocoderRef = useRef(null);


  useEffect(() => {
    if (isLoaded) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  const convertToAddressString = (propertyAddress) => {

    let { Street, City, Province } = propertyAddress;
    if (!Street) Street = '';
    if (!City) City = '';
    if (!Province) Province = '';

    return `${Street}, ${City}, ${Province}`;

  }

  const zoomCenter = () => {
    return new Promise((resolve, reject) => {
      if (zoomMapProperty && geocoderRef.current) {
        setIsZoom(true);
        const addr = convertToAddressString(zoomMapProperty);
  
        geocoderRef.current.geocode({ address: addr }, (results, status) => {
          if (status === 'OK') {
            const position = results[0].geometry.location;
            console.log("zoom pos: " + position)
            resolve({ lat: position.lat(), lng: position.lng() });
          } else {
            console.error('Geocode was not successful for the following reason: ' + status);
            // reject(('Geocode failed with status: ' + status));
          }
        });
      } else {
        // reject(('No zoomMapProperty provided'));
      }
    });
  }

  useEffect(() => {
    if (zoomMapProperty) {
      zoomCenter().then((position) => {
        setCenter(position);
        setIsZoom(true)
        console.log("use effect center: " + center.lat)
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [zoomMapProperty]);
  

  useEffect(() => {
    if (isLoaded) {
      setIsZoom(false)
      // const geocoder = new window.google.maps.Geocoder();

      const geocodePromises = propertyAddresses.map((propertyAddress) => {
        let { street, city, province } = propertyAddress;
        if (!street) street = '';
        if (!city) city = '';
        if (!province) province = '';

        const address = `${street}, ${city}, ${province}`;

        return new Promise((resolve, reject) => {
          geocoderRef.current.geocode({ address }, (results, status) => {
            if (status === 'OK') {
              const position = results[0].geometry.location;
              resolve({ lat: position.lat(), lng: position.lng() });
            } else {
              console.log('Geocode was not successful for the following reason: ' + status);
              // reject(status);
            }
          });
        });
      });

      Promise.all(geocodePromises)
        .then((geocodedMarkers) => {
          setMarkers(geocodedMarkers); // geomarker is lat and long;
          if (geocodedMarkers.length > 0) {
            // setCenter(geocodedMarkers[0]); // TODO: set center to user location?
          }
        })
        .catch((error) => {
          console.error('Error geocoding addresses:', error);
        });
    }
  }, [propertyAddresses, isLoaded]);

  useEffect(() => {
    if (mapRef.current) {
      // Clear existing markers
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
      }
      markersRef.current = []; // Clear the array

      // Add new markers
      const newMarkers = markers.map((marker) => {
        const markerInstance = new window.google.maps.Marker({
          position: marker,
          title: 'Marker',
          icon: {
            url: '/images/marker.png',
            scaledSize: new window.google.maps.Size(50, 50), // Adjust the size as needed
          }
        });
        return markerInstance;
      });

      markersRef.current = newMarkers; // Update markersRef with new markers

      // Initialize marker clusterer
      if (markerClusterRef.current) {
        markerClusterRef.current.clearMarkers();
      }

      markerClusterRef.current = new MarkerClusterer({ map: mapRef.current, markers: newMarkers
      });
    }
  }, [markers, isLoaded]);

  const onLoad = (mapInstance) => {
    mapRef.current = mapInstance;
  };

  console.log(isZoom)

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="map-container"
      center={center}
      zoom={isZoom? 15: 10}
      onLoad={onLoad}
      options={{
        //mapId: 'id',
        styles: mapStyles,
      }}
    >
    </GoogleMap>
  ) : (
    <>Loading...</>
  );
}

export default Map;
