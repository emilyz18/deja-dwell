import { GoogleMap, useJsApiLoader, Marker   } from '@react-google-maps/api';
import React from 'react'
import './Map.css'

// A portion of the code is from: https://www.npmjs.com/package/@react-google-maps/api
// I made deletions and additions to suit my own needs

const vancouver = {
  lat: 49.246292,
  lng: -123.116226,
}

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBLFCLKvngrnl7PBEZczkzLJbObWvJDScM',
  })


  return isLoaded ? (
    <>
    <GoogleMap
        mapContainerClassName="map-container"
        center={vancouver}
      zoom={10}
    >
              <Marker position={vancouver} />

    </GoogleMap>
  
    </>
  ) : (
    <></>
  )
}

export default Map
