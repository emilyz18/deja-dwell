import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, List, ListItem, Snackbar, Alert, Avatar, Stack } from '@mui/material'
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

  const [errors, setErrors] = useState({});
  const validate = () => {
    let tempErrors = {};
    if (!user.UserName) tempErrors.UserName = "Name is required";
    if (!user.UserEmail) tempErrors.UserEmail = "Email is required";
    if (!user.PhoneNumber) tempErrors.PhoneNumber = "Phone number is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

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
    if (validate()) {
      dispatch(editUserAsync(user))
      setIsEditing(false)
    }
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  return (
    <>
      {warning && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning" onClose={() => setWarning(false)}>
            Please complete your {neededInfo}.
          </Alert>
        </Stack>
      )}
      {isEditing ? (
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
          noValidate
          autoComplete="off"
          className="general-input-form"
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" className="header">
            My Profile
          </Typography>
          <div className="auth-form-group">
            <label htmlFor="userName" className="auth-label">Full Name</label>
            <input
              id="userName"
              name="UserName"
              required
              className="auth-input"
              value={user.UserName || ''}
              onChange={handleChange}
              placeholder="Enter name here..."
            />
            {errors.UserName && <Typography color="error">{errors.UserName}</Typography>}
          </div>
          <div className="auth-form-group">
            <label htmlFor="profileImg" className="auth-label">Image URL</label>
            <input
              id="profileImg"
              name="ProfileImg"
              className="auth-input"
              value={user.ProfileImg || ''}
              onChange={handleChange}
              placeholder="Enter Image URL here..."
            />
            <button
              component="label"
              className="upload-button"
            >
              Upload Photo
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handlePicFileUpload}
              />
            </button>
          </div>
          <div className="auth-form-group">
            <label htmlFor="phoneNumber" className="auth-label">Phone Number</label>
            <input
              id="phoneNumber"
              name="PhoneNumber"
              required
              className="auth-input"
              value={user.PhoneNumber || ''}
              onChange={handleChange}
              placeholder="Enter phone number here..."
            />
            {errors.PhoneNumber && <Typography color="error">{errors.PhoneNumber}</Typography>}
          </div>
          <div className="auth-form-group">
            <label htmlFor="userEmail" className="auth-label">Email</label>
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
            {errors.UserEmail && <Typography color="error">{errors.UserEmail}</Typography>}
          </div>
          <div className="button-container">
            <button
              type="submit"
              className="auth-button"
            >
              Save
            </button>
            <button
              className="auth-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </Box>
      ) : (
        <Box className="general-input-form">
          <Avatar
            alt="user profile"
            src={user.ProfileImg}
            sx={{ marginTop: 10, width: 200, height: 200 }}
          />
          <Typography variant="h4" className="header">
            My Profile
          </Typography>
          <List className="info-list">
            <ListItem className="list-item">
              <Typography className="label">Name:</Typography>
              <Typography className="value">{user.UserName || 'N/A'}</Typography>
            </ListItem>
            <ListItem className="list-item">
              <Typography className="label">Phone Number:</Typography>
              <Typography className="value">{user.PhoneNumber || 'N/A'}</Typography>
            </ListItem>
            <ListItem className="list-item">
              <Typography className="label">Email:</Typography>
              <Typography className="value">{user.UserEmail || 'N/A'}</Typography>
            </ListItem>
            <ListItem className="list-item">
              <button
                className="auth-button"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            </ListItem>
          </List>
        </Box>
      )}
      <Snackbar
        open={warning}
        autoHideDuration={3000}
        onClose={() => setWarning(false)}
      >
        <Alert onClose={() => setWarning(false)} severity="warning" sx={{ width: '100%' }}>
          Please complete your {neededInfo}.
        </Alert>
      </Snackbar>
    </>
  )
}
