import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import { getPropertiesAsync } from '../../redux/properties/thunks.js'
import SearchBar from '../searchBar/SearchBar.jsx'

function PropertyCardList(props) {
  const dispatch = useDispatch()
  const propertiesList = useSelector((state) => state.properties.list)
  const getPropertiesStatus = useSelector(
    (state) => state.properties.getProperties
  )

  const { propList } = props
  const [properties, setProperties] = useState(propList)
  const [activeId, setActiveId] = useState(null)

  const [popupPVisible, setPopupPVisible] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)

  const [isDragging, setIsDragging] = useState(false)

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
  }, [getPropertiesStatus, properties, dispatch])

  console.log(propertiesList)

  // TODO: to be implemented logic
  const likedProperty = (id) => {
    console.log('house ' + id + ' was liked!')

    const updatedProperties = properties.filter(
      (property) => property.houseID !== id
    )
    setProperties(updatedProperties)
    console.log(properties)
  }

  // TODO: to be implemented logic
  const dislikedProperty = (id) => {
    console.log('house ' + id + ' was rejected!')
    const updatedProperties = properties.filter(
      (property) => property.houseID !== id
    )
    setProperties(updatedProperties)
    console.log(properties)
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
      // determines the x coord to be dragged
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
    const matchesSearchTerm = property.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesMaxPrice =
      filters.maxPrice === '' || property.price <= parseFloat(filters.maxPrice)
    const matchesProvince =
      filters.province === '' ||
      property.province.toLowerCase() === filters.province.toLowerCase()
    const matchesCity =
      filters.city === '' ||
      property.city.toLowerCase() === filters.city.toLowerCase()
    const matchesStartDate =
      filters.startDate === '' || property.startDate === filters.startDate
    const matchesDuration =
      filters.duration === '' ||
      property.duration.toLowerCase() === filters.duration.toLowerCase()
    const matchesRoomType =
      filters.roomType === '' ||
      property.roomType.toLowerCase() === filters.roomType.toLowerCase()
    const matchesAllowPet = !filters.allowPet || property.allowPet
    const matchesAllowSmoke = !filters.allowSmoke || property.allowSmoke
    const matchesAllowParty = !filters.allowParty || property.allowParty
    const matchesAllowWeed = !filters.allowWeed || property.allowWeed

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

  // The code below was written with the help of ChatGPT 3.5 on Jun 8th
  // Prompt: Give me some examples of dragging and dropping using the dnd kit. Then, use the
  // dnd toolkit to incorporate drag and drop functionality on the miniProperty card + "this file".
  // The generated code was adapted: I added place holders for dropzones and cards to be
  // conditionally displayed. I also wrote css myself tp suit my own needs
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
              {filteredProperties.map((property) =>
                property.houseID === activeId ? (
                  <div
                    key={property.houseID}
                    className="placeholder-card"
                  ></div>
                ) : (
                  <MiniPropertyCard
                    key={property.houseID}
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
