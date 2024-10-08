import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closestCenter, DndContext, DragOverlay, useDroppable } from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import MiniPropertyCard from '../miniPropertyCard/MiniPropertyCard'
import { ExpandedPropertyCard } from '../expandedPropertyCard/ExpandedPropertyCard.jsx'
import './PropertyCardList.css'
import SearchBar from '../searchBar/SearchBar.jsx'
import MapComponent from '../map/MapComponent.jsx'
import HelpPopOver from './HelpPopOver.jsx'
import { getPreferPropertiesAsync, getUnmatchedPropertiesAsync } from '../../redux/properties/thunks'
import { createMatchAsync } from '../../redux/matches/matchThunks'
import { Box, Typography, Fab, Snackbar, Alert } from '@mui/material'
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'
import { getTenantMatchesAsync } from '../../redux/matches/matchThunks'

function PropertyCardList({ searchMode }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  const getUnMatchedPropertiesStatus = useSelector((state) => state.properties.getUnmatchedProperties)
  const getPreferPropertiesStatus = useSelector((state) => state.properties.getPreferProperties)

  const properties = searchMode
    ? useSelector((state) => state.properties.unmatchProperties)
    : useSelector((state) => state.properties.preferProperties)

  const [activeId, setActiveId] = useState(null) // activeId only used when dragging
  const [popupVisible, setPopupVisible] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: '',
  })

  const [zoomMapProperty, setzoomMapProperty] = useState(null)
  const [zoomTrigger, setZoomTrigger] = useState(0)

  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    province: '',
    city: '',
    duration: '',
    startDate: '',
    endDate: '',
    bedroomNum: '',
    bathroomNum: '',
    allowPet: false,
    allowSmoke: false,
    allowParty: false,
    allowWeed: false,
    furnished: false,
    ac: false,
    heater: false,
  })

  useEffect(() => {
    if (getPreferPropertiesStatus === 'IDLE' || getUnMatchedPropertiesStatus === 'IDLE') {
      reloadProperties()
    }
  }, [getUnMatchedPropertiesStatus, getPreferPropertiesStatus, searchMode, dispatch])

  const reloadProperties = () => {
    dispatch(getUnmatchedPropertiesAsync(user.TenantID))
    dispatch(getPreferPropertiesAsync(user.TenantID))
  }

  const likedProperty = (id) => {
    const likedProperty = properties.find((property) => property.HouseID === id)
    dispatch(
      createMatchAsync({
        TenantID: user.TenantID,
        LandlordID: likedProperty.LandlordID,
        HouseID: likedProperty.HouseID,
        MatchStatus: 'Applied',
      })
    ).then(() => {
      reloadProperties()
      dispatch(getTenantMatchesAsync(user.TenantID))
      setNotification({
        open: true,
        message: `Liked property: ${likedProperty.Title}`,
        severity: 'success',
      })
    })
  }

  const dislikedProperty = (id) => {
    const dislikedProperty = properties.find((property) => property.HouseID === id)
    dispatch(
      createMatchAsync({
        TenantID: user.TenantID,
        LandlordID: dislikedProperty.LandlordID,
        HouseID: dislikedProperty.HouseID,
        MatchStatus: 'Disliked',
      })
    ).then(() => {
      reloadProperties()
      dispatch(getTenantMatchesAsync(user.TenantID))
      setNotification({
        open: true,
        message: `Disliked property: ${dislikedProperty.Title}`,
        severity: 'error',
      })
    })
  }

  const zoomMap = (property) => {
    setzoomMapProperty(property)
    setZoomTrigger(Date.now())
  }

  const displayPopup = (property) => {
    setSelectedProperty(property)
    setPopupVisible(true)
  }

  const closePopup = () => {
    setPopupVisible(false)
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
  })

  const displaySearchProperties = properties.filter((property) => {
    const matchesSearchTerm = property.Title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMaxPrice = filters.maxPrice === '' || property.ExpectedPrice <= parseFloat(filters.maxPrice)
    const matchesProvince =
      filters.province === '' || property.Province.toLowerCase() === filters.province.toLowerCase()
    const matchesCity = filters.city === '' || property.City.toLowerCase() === filters.city.toLowerCase()

    const matchesStartDate = filters.startDate === '' || property.StartDate === filters.startDate
    const matchesEndDate = filters.endDate === '' || property.EndDate === filters.endDate
    const matchesBedroomNum = filters.bedroomNum === '' || property.NumBedroom === parseFloat(filters.bedroomNum)
    const matchesBathroomNum = filters.bathroomNum === '' || property.NumBathroom === parseFloat(filters.bathroomNum)

    const matchesAllowPet = !filters.allowPet || property.AllowPet
    const matchesAllowSmoke = !filters.allowSmoke || property.AllowSmoke
    const matchesAllowParty = !filters.allowParty || property.AllowParty
    const matchesAllowWeed = !filters.allowWeed || property.AllowWeed

    const isFurnished = !filters.furnished || property.isFurnished
    const hasAC = !filters.ac || property.isAC
    const hasHeater = !filters.heater || property.isHeater

    return (
      matchesSearchTerm &&
      matchesMaxPrice &&
      matchesProvince &&
      matchesCity &&
      matchesStartDate &&
      matchesEndDate &&
      matchesBedroomNum &&
      matchesBathroomNum &&
      matchesAllowPet &&
      matchesAllowSmoke &&
      matchesAllowParty &&
      matchesAllowWeed &&
      isFurnished &&
      hasAC &&
      hasHeater
    )
  })

  const displayedRecommendationProperty = properties[0] // property length decreases with each like/dislike
  var nextRecommendationProperty = properties[1]

  if (properties.length === 1) {
    nextRecommendationProperty = properties[0]
  }

  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setNotification({ ...notification, open: false })
  }

  const propertyAddresses = displaySearchProperties.map((property) => {
    return {
      HouseID: property.HouseID,
      ExpectedPrice: property.ExpectedPrice,
      Street: property.Street,
      City: property.City,
      Province: property.Province,
    }
  })

  return (
    <>
      {searchMode ? (
        <div className="search-container">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 2,
              pt: 2,
              pb: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                flexGrow: 1,
                fontWeight: 'bold',
                fontFamily: 'Mulish, sans-serif',
              }}
            >
              Search
            </Typography>
          </Box>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} filters={filters} setFilters={setFilters} />
          <div className="search-display">
            <div className="map-border">
              <MapComponent
                properties={displaySearchProperties}
                propertyAddresses={propertyAddresses}
                zoomMapProperty={zoomMapProperty}
                zoomTrigger={zoomTrigger}
                likedFn={likedProperty}
                dislikedFn={dislikedProperty}
              />
            </div>
            <div className="cards-container">
              <div className="cards-list">
                {displaySearchProperties.length === 0 ? (
                  <li className="no-properties-message">No more properties to show</li>
                ) : (
                  displaySearchProperties.map((property) => (
                    <MiniPropertyCard
                      key={property.HouseID}
                      propertyInfo={property}
                      likedFn={likedProperty}
                      dislikedFn={dislikedProperty}
                      displayPopup={() => displayPopup(property)}
                      zoomMap={() => zoomMap(property)}
                      searchMode
                    />
                  ))
                )}
              </div>
            </div>
            {popupVisible && (
              <div className="property-popup-background" onClick={closePopup}>
                <div className="property-popup" onClick={(e) => e.stopPropagation()}>
                  <ExpandedPropertyCard propertyInfo={selectedProperty} />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 2,
              pt: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                flexGrow: 1,
                fontWeight: 'bold',
                fontFamily: 'Mulish, sans-serif',
              }}
            >
              Recommendation
            </Typography>
            <Box
              sx={{
                paddingRight: 10,
              }}
            >
              <HelpPopOver />
            </Box>
          </Box>

          <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="dropzone-container">
              {isDragging ? (
                <div
                  className={`dropzone left-dropzone active-dropzone ${isOverDislike ? 'active' : ''}`}
                  ref={setDislikeRef}
                >
                  <span className="dropzone-icon">✖</span>
                </div>
              ) : (
                <div className={`dropzone left-dropzone${isOverDislike ? 'active' : ''}`} ref={setDislikeRef}>
                  <span className="dropzone-icon">✖</span>
                </div>
              )}
              <SortableContext
                items={[displayedRecommendationProperty]} // Display only the active property
                strategy={rectSortingStrategy}
              >
                <ul id="property-list" className="property-list">
                  {displayedRecommendationProperty ? (
                    isDragging && nextRecommendationProperty ? (
                      <>
                        <MiniPropertyCard
                          key={nextRecommendationProperty.HouseID}
                          propertyInfo={nextRecommendationProperty}
                          likedFn={likedProperty}
                          dislikedFn={dislikedProperty}
                          displayPopup={() => displayPopup(nextRecommendationProperty)}
                        />
                      </>
                    ) : (
                      <>
                        <MiniPropertyCard
                          key={displayedRecommendationProperty.HouseID}
                          propertyInfo={displayedRecommendationProperty}
                          likedFn={likedProperty}
                          dislikedFn={dislikedProperty}
                          displayPopup={() => displayPopup(displayedRecommendationProperty)}
                        />
                      </>
                    )
                  ) : (
                    <li className="no-properties-message">No more properties to show</li>
                  )}
                </ul>
              </SortableContext>
              {isDragging ? (
                <div
                  className={`dropzone right-dropzone active-dropzone ${isOverLike ? 'active' : ''}`}
                  ref={setLikeRef}
                >
                  <span className="dropzone-icon">✔</span>
                </div>
              ) : (
                <div className={`dropzone right-dropzone ${isOverLike ? 'active' : ''}`} ref={setLikeRef}>
                  <span className="dropzone-icon">✔</span>
                </div>
              )}
            </div>
            <DragOverlay>
              {displayedRecommendationProperty !== null && (
                <MiniPropertyCard
                  propertyInfo={displayedRecommendationProperty}
                  likedFn={likedProperty}
                  dislikedFn={dislikedProperty}
                  displayPopup={() => displayPopup(displayedRecommendationProperty)}
                />
              )}
            </DragOverlay>
          </DndContext>
          {popupVisible && (
            <div className="property-popup-background" onClick={closePopup}>
              <div className="property-popup" onClick={(e) => e.stopPropagation()}>
                <ExpandedPropertyCard propertyInfo={selectedProperty} isSearch={true} />
              </div>
            </div>
          )}
        </div>
      )}
      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleNotificationClose}>
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{
            position: 'fixed',
            top: '2%',
            left: '46%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            fontSize: '1.2rem',
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Fab
          variant="extended"
          size="medium"
          onClick={reloadProperties}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          <ReplayRoundedIcon sx={{ mr: 1 }} />
          Reload Properties
        </Fab>
      </Box>
    </>
  )
}

export default PropertyCardList
