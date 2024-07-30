import React from 'react';
import Carousel from '../carousel/Carousel';
import './expandedPropertyCard.css';
import MapComponent from '../map/MapComponent';

export function ExpandedPropertyCard({ propertyInfo, isSearch = false, showButtons = false, likedFn, dislikedFn, setPopupVisible}) {
  if (!propertyInfo) {
    return null;
  }

  const {
    HouseID,
    NumBedroom,
    NumBathroom,
    isAC,
    isHeater,
    isFurnished,
    AllowPet,
    AllowSmoke,
    AllowParty,
    AllowWeed,
    ExpectedPrice,
    Street,
    City,
    Province,
  } = propertyInfo;

  const address = [{ HouseID: HouseID, ExpectedPrice: ExpectedPrice, Street: Street, City: City, Province: Province }];

  const likeProperty = () => {
    likedFn(propertyInfo.HouseID)
    setPopupVisible(false)
  }

  const dislikeProperty = () => {
    dislikedFn(propertyInfo.HouseID)
    setPopupVisible(false)
  }

  return (
    <div className="expanded-property-popup">
      <h1>{propertyInfo.Title}</h1>
      <div className="carousel-container">
        <Carousel data={propertyInfo.HouseImgs} size={{ width: null, height: null }} />
      </div>
      <p>Price: ${propertyInfo.ExpectedPrice}</p>
      <p>
        Address: {propertyInfo.Street}, {propertyInfo.City}, {propertyInfo.Province}
      </p>
      <p>Number of Bedroom: {propertyInfo.NumBedroom}</p>
      <p>Number of Bathroom: {propertyInfo.NumBathroom}</p>
      <p>Parking Availability: {propertyInfo.NumOfParking}</p>
      <p>Description: {propertyInfo.Description}</p>
      <div className="details-row-expand">
        {isAC && <span className="amenity">AC</span>}
        {isHeater && <span className="amenity">Heater</span>}
        {isFurnished && <span className="amenity">Furnished</span>}
        {AllowPet && <span className="amenity">Pet Allowed</span>}
        {AllowSmoke && <span className="amenity">Smoke Allowed</span>}
        {AllowParty && <span className="amenity">Party Allowed</span>}
        {AllowWeed && <span className="amenity">Weed Allowed</span>}
      </div>
      <div>
        {isSearch && <MapComponent propertyAddresses={address} isRecommendation={true}/>
      }
      </div>
      <div>
        {showButtons &&   <div className="buttons-row">
          <button
            className="circle-button cross-button"
            onClick={dislikeProperty}
          >
            ✖
          </button>
          <button
            className="circle-button checkmark-button"
            onClick={likeProperty}
          >
            ✔
          </button>
        </div>}
      </div>
    </div>
  );
}
