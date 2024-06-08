import React, { useState } from 'react'
import './PropertyCardList.css'
import MiniPropertyCard from '../miniPropertyCard/MiniPropertyCard'
import { ExpandedPropertyCard } from '../expandedPropertyCard/expandedPropertyCard'

function PropertyCardList(props) {
  const { propList } = props
  const [properties, setProperties] = useState(propList)

  const [popupPVisible, setPopupPVisible] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)

  // TODO: to be implemented logic
  const likedProperty = (id) => {
    const updatedProperties = properties.filter(
      (property) => property.houseID !== id
    )
    setProperties(updatedProperties)
    console.log(properties)
  }
  // TODO: to be implemented logic
  const dislikedProperty = (id) => {
    const updatedProperties = properties.filter(
      (property) => property.houseID !== id
    )
    setProperties(updatedProperties)
    console.log(properties)
  }

  const displayPopup = (property) => {
    // const selected = properties.filter(property => property.houseID === id);
    setSelectedProperty(property)
    setPopupPVisible(true)
  }

  const closePopup = () => {
    setPopupPVisible(false)
    setPopupPVisible(null)
  }

  return (
    <>
      <ul id="property-list" className="property-list">
        {properties.map((property, index) => (
          <MiniPropertyCard
            key={index}
            propertyInfo={property}
            likedFn={likedProperty}
            dislikedFn={dislikedProperty}
            displayPopup={() => displayPopup(property)}
          />
        ))}
      </ul>
      <div>
        {' '}
        {popupPVisible && (
          <ExpandedPropertyCard
            propertyInfo={selectedProperty}
            closePopup={closePopup}
          />
        )}
      </div>
    </>
  )
}

export default PropertyCardList
