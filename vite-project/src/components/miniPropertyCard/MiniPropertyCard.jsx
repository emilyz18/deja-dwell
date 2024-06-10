import { useSortable } from '@dnd-kit/sortable'
import './MiniPropertyCard.css'
import Carousel from '../carousel/Carousel'
import { Button } from '@mui/material'

function MiniPropertyCard(props) {
  const { propertyInfo, likedFn, dislikedFn, displayPopup } =
    props

    if (!propertyInfo) return null


  // UseSortble was written with the help of ChatGPT 3.5 on Jun 8th
  // Prompt: Give me some examples of dragging and dropping using the dnd kit. Then, use the 
  // dnd toolkit to incorporate drag and drop functionality on the miniProperty card + "code in this file".
  // The generated code was adapted: I changed div organization to exclude some elements from being draggable

  // trandform and transition not used currently, but keep them to potentially add further UI
  // improvements in the future
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: propertyInfo.houseID,
    })

  const likeProperty = () => {
    likedFn(propertyInfo.houseID)
  }

  const dislikeProperty = () => {
    dislikedFn(propertyInfo.houseID)
  }

  const expandProperty = () => {
    console.log('house ' + propertyInfo.houseID + ' was expanded!')
    displayPopup()
  }

  return (
    <>
      <div className="property-card" ref={setNodeRef}>
        <Carousel
          className="carousel-container"
          data={propertyInfo.images}
          size={{ width: 450, height: 250 }}
        />
        <div {...attributes} {...listeners}>
          <div className="card-details">
            <h3 className="house-title">{propertyInfo.title}</h3>
            <div className="details-row">
              <span className="rent">${propertyInfo.price}</span>
              <span className="address">{propertyInfo.address}</span>
              <span className="house-type">{propertyInfo.roomType}</span>
            </div>
          </div>
        </div>
        <div className="buttons-row">
          <button
            className="circle-button cross-button"
            onClick={dislikeProperty}
          >
            ✖
          </button>
          <Button
            variant="contained"
            onClick={expandProperty}
            className="expand-info-button"
          >
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
    </>
  )
}

export default MiniPropertyCard
