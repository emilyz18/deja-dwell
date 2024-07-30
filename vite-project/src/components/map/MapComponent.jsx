import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { ExpandedPropertyCard } from '../expandedPropertyCard/expandedPropertyCard'
import './MapComponent.css'

const vancouver = {
  lat: 49.246292,
  lng: -123.116226,
}

const mapStyles = [
  {
    featureType: 'poi.medical',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.business',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.attraction',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
]

const geocodeCache = new Map()

function MapComponent({
  properties = [],
  propertyAddresses,
  zoomMapProperty,
  isRecommendation = false,
  likedFn,
  dislikedFn,
}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  })

  const [popupVisible, setPopupVisible] = useState(false)

  const [markers, setMarkers] = useState([])
  const [isZoom, setIsZoom] = useState(false)

  const [isZoomHelper, setIsZoomHelper] = useState(false)

  const [selectedProperty, setSelectedProperty] = useState(null)

  const mapRef = useRef()
  const [center, setCenter] = useState(vancouver)
  const markersRef = useRef([])
  const markerClusterRef = useRef()
  const geocoderRef = useRef(null)

  useEffect(() => {
    if (isLoaded) {
      geocoderRef.current = new window.google.maps.Geocoder()
      geocodeCache.clear() // TODO: must clear cache for markers to appear after route switching. Not sure if this is a maps or routes issue
    }
  }, [isLoaded])

  const closePopup = () => {
    setPopupVisible(false)
    setSelectedProperty(null)
  }

  const convertToAddressString = (propertyAddress) => {
    let { Street, City, Province } = propertyAddress

    if (!Street) Street = ''
    if (!City) City = ''
    if (!Province) Province = ''

    return `${Street}, ${City}, ${Province}`
  }

  const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
      if (geocodeCache.has(address)) {
        // console.log("has addr " + geocodeCache.size)
        resolve(geocodeCache.get(address))
      } else {
        geocoderRef.current.geocode({ address }, (results, status) => {
          if (status === 'OK') {
            const position = results[0].geometry.location
            console.log('api call count')
            geocodeCache.set(address, {
              lat: position.lat(),
              lng: position.lng(),
            })
            resolve({ lat: position.lat(), lng: position.lng() })
          } else {
            console.error(
              'Geocode was not successful for the following reason: ' + status
            )
            reject(status) // TODO: dont display error in console
          }
        })
      }
    })
  }

  const zoomCenter = () => {
    return new Promise((resolve, reject) => {
      //TODO: handle reject case
      if (zoomMapProperty && geocoderRef.current) {
        const addr = convertToAddressString(zoomMapProperty)
        geocodeAddress(addr).then(resolve).catch(reject)
      } else {
        // reject(('No zoomMapProperty provided'));
      }
    })
  }

  useEffect(() => {
    if (zoomMapProperty) {
      zoomCenter()
        .then((position) => {
          setCenter(position)
          setIsZoom(true)
          setIsZoomHelper(true)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [zoomMapProperty])

  useEffect(() => {
    if (isLoaded) {
      setIsZoom(false)
      const geocodePromises = propertyAddresses.map((propertyAddress) => {
        const address = convertToAddressString(propertyAddress)
        // return geocodeAddress(address);

        return geocodeAddress(address).then((geocodedMarker) => ({
          ...geocodedMarker,
          HouseID: propertyAddress.HouseID, // Add propertyID here
          ExpectedPrice: propertyAddress.ExpectedPrice,
        }))
      })

      Promise.all(geocodePromises)
        .then((geocodedMarkers) => {
          setMarkers(geocodedMarkers)
          // console.log(geocodedMarkers)
          if (geocodedMarkers.length > 0) {
            if (isRecommendation) {
              setCenter(geocodedMarkers[0])
              setIsZoom(true)
            }
          }
        })
        .catch((error) => {
          console.error('Error geocoding addresses:', error)
        })
    }
  }, [propertyAddresses, isLoaded])

  const onMarkerClick = useCallback(
    (houseID) => {
      if (!isRecommendation) {
      return () => {
        const property = properties.find(
          (property) => property.HouseID === houseID
        )
        setSelectedProperty(property)
        setPopupVisible(true)
      }
    }
    },
    [properties]
  )

  useEffect(() => {
    if (mapRef.current) {
      if (markersRef.current) {
        markersRef.current.forEach((marker) => marker.setMap(null))
      }
      markersRef.current = []

      const newMarkers = markers.map((marker) => {
        const markerInstance = new window.google.maps.Marker({
          position: marker,
          title: `$${String(marker.ExpectedPrice)}`,
          icon: {
            url: '/images/marker.png',
            scaledSize: new window.google.maps.Size(50, 50),
          },
        })
        if (!isRecommendation) {
          markerInstance.addListener('click', onMarkerClick(marker.HouseID))
        }
        return markerInstance
      })

      if (isZoomHelper) {
        mapRef.current.setZoom(15)
      }

      markersRef.current = newMarkers

      if (markerClusterRef.current) {
        markerClusterRef.current.clearMarkers()
      }

      markerClusterRef.current = new MarkerClusterer({
        map: mapRef.current,
        markers: newMarkers,
      })
    }
  }, [markers, isLoaded])

  const onLoad = (mapInstance) => {
    mapRef.current = mapInstance
  }

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerClassName="map-container"
        center={center}
        zoom={isZoom ? 15 : 10}
        onLoad={onLoad}
        options={{
          styles: mapStyles,
        }}
      ></GoogleMap>
      {popupVisible && (
        <div className="marker-popup-background" onClick={closePopup}>
          <div className="marker-popup" onClick={(e) => e.stopPropagation()}>
            <ExpandedPropertyCard
              propertyInfo={selectedProperty}
              showButtons={true}
              likedFn={likedFn}
              dislikedFn={dislikedFn}
              setPopupVisible={setPopupVisible}
            />
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="loading">Loading...</div>
  )
  // return (
  //   <div className='loading'>
  //   Loading...</div>
  // )
}
export default MapComponent
