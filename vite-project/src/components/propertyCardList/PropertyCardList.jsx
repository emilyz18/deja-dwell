import React, { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useDroppable,
} from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import MiniPropertyCard from '../miniPropertyCard/MiniPropertyCard'
import { ExpandedPropertyCard } from '../expandedPropertyCard/expandedPropertyCard'
import './PropertyCardList.css'

function PropertyCardList(props) {
  const { propList } = props
  const [properties, setProperties] = useState(propList)
  const [activeId, setActiveId] = useState(null)

  const [popupPVisible, setPopupPVisible] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)

  const [isDragging, setIsDragging] = useState(false)

  const likedProperty = (id) => {
    console.log('house ' + id + ' was liked!')

    const updatedProperties = properties.filter(
      (property) => property.houseID !== id
    )
    setProperties(updatedProperties)
  }

  const dislikedProperty = (id) => {
    console.log('house ' + id + ' was rejected!')
    const updatedProperties = properties.filter(
      (property) => property.houseID !== id
    )
    setProperties(updatedProperties)
  }

  const displayPopup = (property) => {
    setSelectedProperty(property)
    setPopupPVisible(true)
  }

  const closePopup = () => {
    setPopupPVisible(false)
    setSelectedProperty(null)
  }

  const handleDragStart = (event) => {
    const { active } = event
    setActiveId(active.id)
    setIsDragging(true)
  }

  const handleDragEnd = (event) => {
    const { delta } = event
    
    if (delta.x > 200) { 
      likedProperty(activeId)
    } else if (delta.x < -200) {
      dislikedProperty(activeId)
    }

    setActiveId(null)
    setIsDragging(false)
  }

  const { setNodeRef: setLikeRef, isOver: isOverLike } = useDroppable({
    id: 'like-dropzone',
 
  });
  
  const { setNodeRef: setDislikeRef, isOver: isOverDislike } = useDroppable({
    id: 'dislike-dropzone',
    onDragEnter: () => {
      console.log('Draggable card entered the dislike dropzone');
    },
    onDragLeave: () => {
      console.log('Draggable card left the dislike dropzone');
    },
  });
  

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="dropzone-container">
          {isDragging ? (
            <div
              className={`dropzone left-dropzone ${isOverDislike ? 'active' : ''}`}
              ref={setDislikeRef}
            >
              <span className="dropzone-icon">✖</span>
            </div>
          ) : (
            <div className="dropzone-placeholder">
            </div>
          )}
          <SortableContext items={properties} strategy={rectSortingStrategy}>
            <ul id="property-list" className="property-list">
              {properties.map((property) => (
                property.houseID === activeId ? (
                  <div key={property.houseID} className="placeholder-card"></div>
                ) : (
                  <MiniPropertyCard
                    key={property.houseID}
                    propertyInfo={property}
                    likedFn={likedProperty}
                    dislikedFn={dislikedProperty}
                    displayPopup={() => displayPopup(property)}
                  />
                )
              ))}
            </ul>
          </SortableContext>
          {isDragging ? (
            <div
              className={`dropzone right-dropzone ${isOverLike ? 'active' : ''}`}
              ref={setLikeRef}
            >
              <span className="dropzone-icon">✔</span>
            </div>
          ) : (
            <div className="dropzone-placeholder">
            </div>
          )}
        </div>
        <DragOverlay>
          {activeId ? (
            <MiniPropertyCard
              propertyInfo={properties.find(
                (property) => property.houseID === activeId
              )}
              likedFn={likedProperty}
              dislikedFn={dislikedProperty}
              displayPopup={() =>
                displayPopup(
                  properties.find((property) => property.houseID === activeId)
                )
              }
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <div>
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
