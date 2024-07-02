import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  closestCenter,
  DndContext,
  DragOverlay,
  useDroppable,
} from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import MiniPropertyCard from '../miniPropertyCard/MiniPropertyCard'
import { ExpandedPropertyCard } from '../expandedPropertyCard/expandedPropertyCard'
import './PropertyCardList.css'
import SearchBar from '../searchBar/SearchBar.jsx'
import { getPropertiesAsync } from '../../redux/properties/thunks'
import {
  getMatchesAsync,
  createMatchAsync,
} from '../../redux/matches/matchThunks'
import { Alert, Snackbar } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

function PropertyCardList() {
  const dispatch = useDispatch()
  const matches = useSelector((state) => state.matches.list)
  const user = useSelector((state) => state.user.user)
  const allProperties = useSelector((state) => state.properties.list)
  const getPropertiesStatus = useSelector(
    (state) => state.properties.getProperties
  )
  const [activeId, setActiveId] = useState(null)
  const [popupPVisible, setPopupPVisible] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: '',
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    province: '',
    city: '',
    duration: '',
    startDate: '',
    roomType: '',
    allowPet: false,
    allowSmoke: false,
    allowParty: false,
    allowWeed: false,
  })

  useEffect(() => {
    if (getPropertiesStatus === 'IDLE') {
      dispatch(getPropertiesAsync())
    }
    dispatch(getMatchesAsync())
  }, [getPropertiesStatus, dispatch])

  // Filter properties that the user has not interacted with
  const properties = allProperties.filter(
    (property) =>
      !matches.some(
        (match) =>
          match.HouseID === property.HouseID && match.TenantID === user.TenantID
      )
  )

  const likedProperty = (id) => {
    const likedProperty = properties.find((property) => property.HouseID === id)
    dispatch(
      createMatchAsync({
        MatchID: uuidv4(),
        TenantID: user.TenantID,
        LandlordID: likedProperty.LandlordID,
        HouseID: likedProperty.HouseID,
        MatchStatus: 'Applied',
      })
    ).then(() => {
      dispatch(getMatchesAsync())
      setNotification({
        open: true,
        message: `Liked property: ${likedProperty.Title}`,
        severity: 'success',
      })
    })
  }

  const dislikedProperty = (id) => {
    const dislikedProperty = properties.find(
      (property) => property.HouseID === id
    )
    dispatch(
      createMatchAsync({
        MatchID: uuidv4(),
        TenantID: user.TenantID,
        LandlordID: dislikedProperty.LandlordID,
        HouseID: dislikedProperty.HouseID,
        MatchStatus: 'Disliked',
      })
    ).then(() => {
      dispatch(getMatchesAsync())
      setNotification({
        open: true,
        message: `Disliked property: ${dislikedProperty.Title}`,
        severity: 'error',
      })
    })
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
  })

  const { setNodeRef: setDislikeRef, isOver: isOverDislike } = useDroppable({
    id: 'dislike-dropzone',
    onDragEnter: () => {
      console.log('Draggable card entered the dislike dropzone')
    },
    onDragLeave: () => {
      console.log('Draggable card left the dislike dropzone')
    },
  })

  const filteredProperties = properties.filter((property) => {
    const matchesSearchTerm = property.Title.toLowerCase().includes(
      searchTerm.toLowerCase()
    )
    const matchesMaxPrice =
      filters.maxPrice === '' ||
      property.ExpectedPrice <= parseFloat(filters.maxPrice)
    const matchesProvince =
      filters.province === '' ||
      property.Province.toLowerCase() === filters.province.toLowerCase()
    const matchesCity =
      filters.city === '' ||
      property.City.toLowerCase() === filters.city.toLowerCase()
    const matchesStartDate =
      filters.startDate === '' || property.StartDate === filters.startDate
    const matchesDuration =
      filters.duration === '' ||
      property.Duration.toLowerCase() === filters.duration.toLowerCase()
    const matchesRoomType =
      filters.roomType === '' ||
      property.RoomType.toLowerCase() === filters.roomType.toLowerCase()
    const matchesAllowPet = !filters.allowPet || property.AllowPet
    const matchesAllowSmoke = !filters.allowSmoke || property.AllowSmoke
    const matchesAllowParty = !filters.allowParty || property.AllowParty
    const matchesAllowWeed = !filters.allowWeed || property.AllowWeed

    return (
      matchesSearchTerm &&
      matchesMaxPrice &&
      matchesProvince &&
      matchesCity &&
      matchesStartDate &&
      matchesDuration &&
      matchesRoomType &&
      matchesAllowPet &&
      matchesAllowSmoke &&
      matchesAllowParty &&
      matchesAllowWeed
    )
  })

  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setNotification({ ...notification, open: false })
  }
  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
      />{' '}
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
          <SortableContext
            items={filteredProperties}
            strategy={rectSortingStrategy}
          >
            <ul id="property-list" className="property-list">
              {filteredProperties.length === 0 ? (
                <li className="no-properties-message">
                  No more properties to show
                </li>
              ) : (
                filteredProperties.map((property) =>
                  property.HouseID === activeId ? (
                    <div
                      key={property.HouseID}
                      className="placeholder-card"
                    ></div>
                  ) : (
                    <MiniPropertyCard
                      key={property.HouseID}
                      propertyInfo={property}
                      likedFn={likedProperty}
                      dislikedFn={dislikedProperty}
                      displayPopup={() => displayPopup(property)}
                    />
                  )
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
              propertyInfo={properties.find(
                (property) => property.HouseID === activeId
              )}
              likedFn={likedProperty}
              dislikedFn={dislikedProperty}
              displayPopup={() =>
                displayPopup(
                  properties.find((property) => property.HouseID === activeId)
                )
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
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default PropertyCardList
