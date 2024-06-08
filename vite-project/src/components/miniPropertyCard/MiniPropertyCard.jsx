import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import './MiniPropertyCard.css'
import Carousel from '../carousel/Carousel'
import { Button } from '@mui/material'

function MiniPropertyCard(props) {
  const { propertyInfo, likedFn, dislikedFn, displayPopup } = props
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: propertyInfo.houseID })

  if (!propertyInfo) return null

  const likeProperty = () => {
    // console.log('house ' + propertyInfo.houseID + ' was liked!')
    likedFn(propertyInfo.houseID)
  }

  const dislikeProperty = () => {
    // console.log('house ' + propertyInfo.houseID + ' was rejected!')
    dislikedFn(propertyInfo.houseID)
  }

  const expandProperty = () => {
    console.log('house ' + propertyInfo.houseID + ' was expanded!')
    displayPopup()
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      className="property-card"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="carousel-container">
        <Carousel
          data={propertyInfo.images}
          size={{ width: null, height: null }}
        />
      </div>
      <div className="card-details">
        <h3 className="house-title">{propertyInfo.title}</h3>
        <div className="details-row">
          <span className="rent">${propertyInfo.price}</span>
          <span className="address">{propertyInfo.address}</span>
          <span className="house-type">{propertyInfo.roomType}</span>
        </div>
        <div className="buttons-row">
          <button
            className="circle-button cross-button"
            onClick={dislikeProperty}
          >
            ✖
          </button>
          <Button variant="contained" onClick={expandProperty}>
            Expand Info
          </Button>
          <button
            className="circle-button checkmark-button"
            onClick={likeProperty}
          >
            ✔
          </button>
        </div>
      </div>
    </li>
  )
}

export default MiniPropertyCard
