import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCenter, useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import MiniPropertyCard from '../miniPropertyCard/MiniPropertyCard';
import { ExpandedPropertyCard } from '../expandedPropertyCard/expandedPropertyCard';
import './PropertyCardList.css';

function PropertyCardList(props) {
  const { propList } = props;
  const [properties, setProperties] = useState(propList);
  const [activeId, setActiveId] = useState(null);

  const [popupPVisible, setPopupPVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const likedProperty = (id) => {
    console.log('house ' + id + ' was liked!')

    const updatedProperties = properties.filter((property) => property.houseID !== id);
    setProperties(updatedProperties);
  };

  const dislikedProperty = (id) => {
    console.log('house ' + id + ' was rejected!')
    const updatedProperties = properties.filter((property) => property.houseID !== id);
    setProperties(updatedProperties);
  };

  const displayPopup = (property) => {
    setSelectedProperty(property);
    setPopupPVisible(true);
  };

  const closePopup = () => {
    setPopupPVisible(false);
    setSelectedProperty(null);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event) => {
    const { delta } = event;
    if (delta.x > 200) {
      likedProperty(activeId);
    } else if (delta.x < -200) {
      dislikedProperty(activeId);
    }

    setActiveId(null);
  };

  const { setNodeRef: setLikeRef, isOver: isOverLike } = useDroppable({
    id: 'like-dropzone',
  });

  const { setNodeRef: setDislikeRef, isOver: isOverDislike } = useDroppable({
    id: 'dislike-dropzone',
  });

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="dropzone-container">
          <div className={`dropzone left-dropzone ${isOverDislike ? 'active' : ''}`} ref={setDislikeRef}>
            <span className="dropzone-icon">✖</span>
          </div>
          <SortableContext items={properties} strategy={rectSortingStrategy}>
            <ul id="property-list" className="property-list">
              {properties.map((property) => (
                <MiniPropertyCard
                  key={property.houseID}
                  propertyInfo={property}
                  likedFn={likedProperty}
                  dislikedFn={dislikedProperty}
                  displayPopup={() => displayPopup(property)}
                />
              ))}
            </ul>
          </SortableContext>
          <div className={`dropzone right-dropzone ${isOverLike ? 'active' : ''}`} ref={setLikeRef}>
            <span className="dropzone-icon">✔</span>
          </div>
        </div>
        <DragOverlay>
          {activeId ? (
            <MiniPropertyCard
              propertyInfo={properties.find((property) => property.houseID === activeId)}
              likedFn={likedProperty}
              dislikedFn={dislikedProperty}
              displayPopup={() => displayPopup(properties.find((property) => property.houseID === activeId))}
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
  );
}

export default PropertyCardList;
