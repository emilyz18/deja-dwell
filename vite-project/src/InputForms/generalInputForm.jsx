import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { Box, Typography, List, ListItem } from '@mui/material'
import { Grid } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className="name-field"
                label="Full Name"
                variant="filled"
                required
                name="UserName"
                value={user.UserName || ''}
                onChange={handleChange}
                placeholder="Enter name here..."
                fullWidth
                margin="normal"
                error={!!errors.UserName}
                helperText={errors.UserName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="image-field"
                label="Image URL"
                variant="filled"
                name="ProfileImg"
                value={user.ProfileImg || ''}
                onChange={handleChange}
                placeholder="Enter Image URL here..."
                fullWidth
                margin="normal"
                
              />
              <Button
                value={user.ProfileImg || ''}
                component="label"
                variant="contained"
                className="upload-button"
              >
                Upload Photo
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handlePicFileUpload}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="phoneNumber-field"
                label="Phone Number"
                variant="filled"
                required
                name="PhoneNumber"
                value={user.PhoneNumber || ''}
                onChange={handleChange}
                placeholder="Enter phone number here..."
                fullWidth
                margin="normal"
                error={!!errors.PhoneNumber}
                helperText={errors.PhoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="email-field"
                label="Email"
                variant="filled"
                required
                type="email"
                name="UserEmail"
                value={user.UserEmail || ''}
                onChange={handleChange}
                placeholder="Enter email here..."
                fullWidth
                margin="normal"
                error={!!errors.UserEmail}
                helperText={errors.UserEmail}
              />
            </Grid>
            <Grid item xs={12} className="button-container">
              <Button
                className="button"
                type="submit"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                className="button"
                variant="contained"
                color="primary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
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
          <List>
            <ListItem className="list-item">
              <Typography>Name: {user.UserName || 'N/A'}</Typography>
            </ListItem>
            <ListItem className="list-item">
              <Typography>Phone Number: {user.PhoneNumber || 'N/A'}</Typography>
            </ListItem>
            <ListItem className="list-item">
              <Typography>Email: {user.UserEmail || 'N/A'}</Typography>
            </ListItem>
            <ListItem className="list-item">
              <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
                className="button"
              >
                Edit Profile
              </Button>
            </ListItem>
          </List>
        </Box>
      )}
    </>
  )
}
