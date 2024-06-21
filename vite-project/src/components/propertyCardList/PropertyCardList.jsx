import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useDroppable,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import MiniPropertyCard from '../miniPropertyCard/MiniPropertyCard';
import { ExpandedPropertyCard } from '../expandedPropertyCard/expandedPropertyCard';
import './PropertyCardList.css';
import { getPropertiesAsync } from '../../redux/properties/thunks';
import { createMatchAsync } from '../../redux/matches/matchThunks';
import { Snackbar, Alert } from '@mui/material';

function PropertyCardList() {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.list);
  const getPropertiesStatus = useSelector((state) => state.properties.getProperties);
  const user = useSelector((state) => state.user.user);
  const [activeId, setActiveId] = useState(null);
  const [popupPVisible, setPopupPVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    if (getPropertiesStatus === 'IDLE') {
      dispatch(getPropertiesAsync());
    }
  }, [getPropertiesStatus, dispatch]);

  const likedProperty = (id) => {
    const likedProperty = properties.find((property) => property.HouseID === id);
    dispatch(createMatchAsync({
      TenantID: user.TenantID,
      LandlordID: likedProperty.LandlordID,
      HouseID: likedProperty.HouseID,
      MatchStatus: 'Applied'
    }));
    setNotification({ open: true, message: `Liked property: ${likedProperty.Title}`, severity: 'success' });
    dispatch({ type: 'properties/removeProperty', payload: id });
  };

  const dislikedProperty = (id) => {
    const dislikedProperty = properties.find((property) => property.HouseID === id);
    dispatch(createMatchAsync({
      TenantID: user.TenantID,
      LandlordID: dislikedProperty.LandlordID,
      HouseID: dislikedProperty.HouseID,
      MatchStatus: 'Disliked'
    }));
    setNotification({ open: true, message: `Disliked property: ${dislikedProperty.Title}`, severity: 'info' });
    dispatch({ type: 'properties/removeProperty', payload: id });
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
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    const { delta } = event;

    if (delta.x > 200) {
      likedProperty(activeId);
    } else if (delta.x < -200) {
      dislikedProperty(activeId);
    }

    setActiveId(null);
    setIsDragging(false);
  };

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

  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

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
                <div className="dropzone-placeholder"></div>
            )}
            <SortableContext items={properties} strategy={rectSortingStrategy}>
              <ul id="property-list" className="property-list">
                {properties.map((property) =>
                    property.HouseID === activeId ? (
                        <div key={property.HouseID} className="placeholder-card"></div>
                    ) : (
                        <MiniPropertyCard
                            key={property.HouseID}
                            propertyInfo={property}
                            likedFn={likedProperty}
                            dislikedFn={dislikedProperty}
                            displayPopup={() => displayPopup(property)}
                        />
                    )
                )}
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
                <div className="dropzone-placeholder"></div>
            )}
          </div>
          <DragOverlay>
            {activeId ? (
                <MiniPropertyCard
                    propertyInfo={properties.find((property) => property.HouseID === activeId)}
                    likedFn={likedProperty}
                    dislikedFn={dislikedProperty}
                    displayPopup={() =>
                        displayPopup(properties.find((property) => property.HouseID === activeId))
                    }
                />
            ) : null}
          </DragOverlay>
        </DndContext>
        {popupPVisible && (
            <div className="property-popup-background" onClick={closePopup}>
              <div className="property-popup" onClick={(e) => e.stopPropagation()}>
                <ExpandedPropertyCard propertyInfo={selectedProperty} />
              </div>
            </div>
        )}
        <Snackbar
            open={notification.open}
            autoHideDuration={3000}
            onClose={handleNotificationClose}
        >
          <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </>
  );
}

export default PropertyCardList;
