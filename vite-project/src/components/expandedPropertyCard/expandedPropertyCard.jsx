import Carousel from '../carousel/Carousel'
import './expandedPropertyCard.css'

export function ExpandedPropertyCard({ propertyInfo }) {
  return (
    <div className="expanded-property-popup">
      <h1>{propertyInfo.title}</h1>
      <div className="carousel-container">
        <Carousel
          data={propertyInfo.HouseImgs}
          size={{ width: null, height: null }}
        />
      </div>
      <p>Price: ${propertyInfo.ExpectedPrice}</p>
      <p>
        Address: {propertyInfo.Street}, {propertyInfo.City},{' '}
        {propertyInfo.Province}
      </p>
      <p>Room Type: {propertyInfo.RoomType}</p>
      <p>Parking Availability: {propertyInfo.NumOfParking}</p>
      <p>Description: {propertyInfo.Description}</p>
    </div>
  )
}
