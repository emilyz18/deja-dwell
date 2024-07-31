import React, { useState, useEffect } from 'react'
import { Snackbar, Alert, Avatar } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getUserAsync, editUserAsync } from '../redux/user/thunks.js'
import { updateUser } from '../redux/user/reducer.js'
import './generalInputForm.css'

export function GeneralInputForm() {
  const [isEditing, setIsEditing] = useState(false)
  const [warning, setWarning] = useState(false)
  const [neededInfo, setNeededInfo] = useState('')
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const location = useLocation()

  const [errors, setErrors] = useState({})
  useEffect(() => {
    if (user && user.UserID) {
      dispatch(getUserAsync(user.UserID))
    }
  }, [dispatch, user.UserID])

  useEffect(() => {
    if (location.state && location.state.fromSignUp) {
      setWarning(true)
      if (location.state.fromSignUp === 'Landlord') {
        setNeededInfo('Profile')
      } else if (location.state.fromSignUp === 'Tenant') {
        setNeededInfo('Profile and Rent preference')
      }
    }
  }, [location.state])

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch(updateUser({ ...user, [name]: value }))
  }

  const handlePicFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const curFile = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        dispatch(updateUser({ ...user, ProfileImg: reader.result }))
      }
      reader.readAsDataURL(curFile)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    //using HTML5 validation
    dispatch(editUserAsync(user))
    setIsEditing(false)
    
  }

  return (
    <>
      {warning && (
        <div className="alert-container">
          <Alert severity="warning" onClose={() => setWarning(false)}>
            Please complete your {neededInfo}.
          </Alert>
        </div>
      )}
      {isEditing ? (
        <div className="general-input-form-container">
          <div className="general-input-form">
            <h2 className="header">My Profile</h2>
            <form className="input-form-form" onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label htmlFor="userName" className="auth-label">
                  Full Name
                </label>
                <input
                  id="userName"
                  name="UserName"
                  required
                  className="auth-input"
                  value={user.UserName || ''}
                  onChange={handleChange}
                  placeholder="Enter name here..."
                  maxLength="20"
                  pattern="[A-Za-z0-9\s]+"
                  title="Name should only contain letters, numbers, and spaces"
                />
              </div>
              <div className="auth-form-group">
                <label htmlFor="profileImg" className="auth-label">
                  Image URL
                </label>
                <input
                  id="profileImg"
                  name="ProfileImg"
                  className="auth-input"
                  value={user.ProfileImg || ''}
                  onChange={handleChange}
                  placeholder="Enter Image URL here..."
                />
                <button
                  type="button"
                  className="upload-button"
                  onClick={() => document.getElementById('fileUpload').click()}
                >
                  Upload Photo
                </button>
                <input
                  type="file"
                  id="fileUpload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handlePicFileUpload}
                />
              </div>
              <div className="auth-form-group">
                <label htmlFor="phoneNumber" className="auth-label">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="PhoneNumber"
                  required
                  className="auth-input"
                  value={user.PhoneNumber || ''}
                  onChange={handleChange}
                  placeholder="Enter phone number here..."
                  type="tel"
                />
                {errors.PhoneNumber && (
                  <p className="error">{errors.PhoneNumber}</p>
                )}
              </div>
              <div className="auth-form-group">
                <label htmlFor="userEmail" className="auth-label">
                  Email
                </label>
                <input
                  id="userEmail"
                  name="UserEmail"
                  type="email"
                  required
                  className="auth-input"
                  value={user.UserEmail || ''}
                  onChange={handleChange}
                  placeholder="Enter email here..."
                />
                
              </div>
              <div className="button-container">
                <button type="submit" className="auth-button">
                  Save
                </button>
                <button
                  type="button"
                  className="auth-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="general-input-form-container">
          <div className="general-input-form">
            <Avatar
              alt="user profile"
              src={user.ProfileImg}
              sx={{ marginTop: 0, width: 200, height: 200 }}
            />
            <h2 className="header">My Profile</h2>
            <ul className="info-list">
              <li className="list-item">
                <span className="label">Name:</span>
                <span className="value">{user.UserName || 'N/A'}</span>
              </li>
              <li className="list-item">
                <span className="label">Phone Number:</span>
                <span className="value">{user.PhoneNumber || 'N/A'}</span>
              </li>
              <li className="list-item">
                <span className="label">Email:</span>
                <span className="value">{user.UserEmail || 'N/A'}</span>
              </li>
              <li className="list-item">
                <button className="auth-button" onClick={handleEdit}>
                  Edit Profile
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Snackbar
        open={warning}
        autoHideDuration={3000}
        onClose={() => setWarning(false)}
      >
        <Alert
          onClose={() => setWarning(false)}
          severity="warning"
          sx={{ width: '100%' }}
        >
          Please complete your {neededInfo}.
        </Alert>
      </Snackbar>
    </>
  )
}
