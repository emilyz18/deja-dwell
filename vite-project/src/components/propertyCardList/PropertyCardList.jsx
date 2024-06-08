import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCenter, useDroppable } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import MiniPropertyCard from '../miniPropertyCard/MiniPropertyCard';
import { ExpandedPropertyCard } from '../expandedPropertyCard/expandedPropertyCard';
import './PropertyCardList.css';

function PropertyCardList(props) {
  const { propList } = props;
  const [properties, setProperties] = useState(propList);
  const [activeId, setActiveId] = useState(null);
  const [draggingDirection, setDraggingDirection] = useState(null);

  const [popupPVisible, setPopupPVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const likedProperty = (id) => {
    const updatedProperties = properties.filter((property) => property.houseID !== id);
    setProperties(updatedProperties);
  };

  const dislikedProperty = (id) => {
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
    const { over } = event;

    if (draggingDirection === 'right' && over && over.id === 'like-dropzone') {
      likedProperty(activeId);
    } else if (draggingDirection === 'left' && over && over.id === 'dislike-dropzone') {
      dislikedProperty(activeId);
    }

    setActiveId(null);
    setDraggingDirection(null);
  };

  const handleDragMove = (event) => {
    const { delta } = event;
    if (delta.x > 0) {
      setDraggingDirection('right');
    } else if (delta.x < 0) {
      setDraggingDirection('left');
    }
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
        onDragMove={handleDragMove}
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
