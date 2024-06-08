import Carousel from '../carousel/Carousel'
import Button from '@mui/material/Button'
import './expandedProperty.css'

export function ExpandedPropertyCard({ propertyInfo, closePopup }) {
  return (
    <>
      <div className="property-popup">
        <h1>{propertyInfo.title}</h1>
        <div className="carousel-container">
          <Carousel
            data={propertyInfo.images}
            size={{ width: null, height: null }}
          />
        </div>
        <p>Price: ${propertyInfo.price}</p>
        <p>Address :{propertyInfo.address}</p>
        <p>Room Type: {propertyInfo.roomType}</p>
        <p>Parking Availability: {propertyInfo.parkingAvailability}</p>
        <p>Description: {propertyInfo.description}</p>

        <Button variant="contained" size="small" onClick={closePopup}>
          Close
        </Button>
      </div>
    </>
  )
}
