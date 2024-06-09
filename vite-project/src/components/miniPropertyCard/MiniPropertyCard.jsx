import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './MiniPropertyCard.css';
import Carousel from '../carousel/Carousel';
import { Button } from '@mui/material';

function MiniPropertyCard(props) {
  const { propertyInfo, likedFn, dislikedFn, displayPopup } = props;
  const [allowDragging, setAllowDragging] = useState(true);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: propertyInfo.houseID,
    disabled: !allowDragging, // Disable sorting if allowDragging is false
  });

  const likeProperty = () => {
    likedFn(propertyInfo.houseID);
  };

  const dislikeProperty = () => {
    dislikedFn(propertyInfo.houseID);
  };

  const expandProperty = () => {
    console.log('house ' + propertyInfo.houseID + ' was expanded!');
    displayPopup();
  };

  const handleMouseDown = (event) => {
    if (event.target.classList.contains('expand-info-button')) {
      console.log("expand clicked")
      setAllowDragging(false); // Disable dragging when clicking on the expand button
    } else {
      setAllowDragging(true); // Enable dragging for other elements
    }
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      className="property-card"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseDown={handleMouseDown} // Add onMouseDown event handler
    >
      <div className="carousel-container">
        <Carousel data={propertyInfo.images} size={{ width: null, height: null }} />
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
          <Button variant="contained" onClick={expandProperty} className="expand-info-button">
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
  );
}

export default MiniPropertyCard;
