import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLandlordAsync } from '../../redux/landlord/thunks'
import { getPropertyByIdAsync, patchPropertyAsync, createPropertyAsync } from '../../redux/properties/thunks'
import { updateProperty } from '../../redux/properties/reducer'
import { PropertyForm } from './PropertyForm'
import { PropertyInputDisplay } from './PropertyInputDisplay'
import './PropertyForm.css'

export function PropertyEditPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const dispatch = useDispatch()
  const LandlordID = useSelector((state) => state.user.user.LandlordID)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const landlord = useSelector((state) => state.landlord.landlord)
  const property = useSelector((state) => state.properties.property)

  useEffect(() => {
    if (isAuthenticated && LandlordID) {
      dispatch(getLandlordAsync(LandlordID))
    }
  }, [dispatch, isAuthenticated, LandlordID])

  useEffect(() => {
    if (landlord.LandlordID && landlord.HouseID) {
      dispatch(getPropertyByIdAsync(landlord.HouseID))
    }
  }, [dispatch, landlord.LandlordID, landlord.HouseID])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    dispatch(updateProperty({ [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const requestData = {
      LandlordID: LandlordID,
      HouseID: landlord.HouseID,
      ...property,
    }

    if (property.HouseID) {
      dispatch(patchPropertyAsync({ HouseID: landlord.HouseID, property: requestData }))
    } else {
      await dispatch(createPropertyAsync(requestData))
      await dispatch(getPropertyByIdAsync(landlord.HouseID))
    }

    setIsEditing(false)
    setIsCreating(false)
  }

  const handleCreateNewPost = () => {
    setIsEditing(true)
    setIsCreating(true)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setIsCreating(false)
  }

  const handleImageChange = (index, field, event) => {
    const newImages = [...property.HouseImgs]
    newImages[index] = { ...newImages[index], [field]: event.target.value }
    dispatch(updateProperty({ HouseImgs: newImages }))
  }

  if (!landlord) {
    return <div>Loading... It is definitely not broken</div>
  }

  return (
    <div className="property-edit-page">
      {!property.HouseID || isCreating ? (
        <button className="create-new-post-button" onClick={handleCreateNewPost}>
          Create New Post
        </button>
      ) : null}

      {(isEditing || isCreating) && (
        <PropertyForm
          property={property}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleCancel={handleCancel}
          handleImageChange={handleImageChange}
        />
      )}
      {!isEditing && !isCreating && property.HouseID && (
        <PropertyInputDisplay property={property} handleEdit={handleEdit} />
      )}
    </div>
  )
}
