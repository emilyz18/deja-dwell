import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateTenant,
  updateTenantPref,
} from '../redux/tenant/tenantReducer.js'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import {
  Box,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import './TenantInputForm.css'
import {
  getTenantPrefAsync,
  getTenantProfileAsync,
  patchTenantPrefAsync,
  patchTenantProfileAsync,
} from '../redux/tenant/thunks.js'

export function TenantInputForm() {
  const [customGender, setCustomGender] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useDispatch()

  // for user reducer
  const tenantID = useSelector((state) => state.user.user.TenantID)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const { tenant, tenantPref } = useSelector((state) => state.tenant)

  useEffect(() => {
    if (isAuthenticated && tenantID) {
      dispatch(getTenantProfileAsync(tenantID))
    }
  }, [dispatch, isAuthenticated, tenantID])

  useEffect(() => {
    if (isAuthenticated && tenant.TenantPreferenceID) {
      dispatch(getTenantPrefAsync(tenant.TenantPreferenceID))
    }
  }, [dispatch, isAuthenticated, tenant.TenantPreferenceID])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name in tenant) {
      dispatch(updateTenant({ [name]: type === 'checkbox' ? checked : value }))
    } else {
      dispatch(
        updateTenantPref({ [name]: type === 'checkbox' ? checked : value })
      )
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(patchTenantProfileAsync({ tenantID, tenant }))
    if (tenant.TenantPreferenceID) {
      dispatch(
        patchTenantPrefAsync({
          tenantPreferenceID: tenant.TenantPreferenceID,
          tenantPref,
        })
      )
    } else {
      console.error(
        'In input form component. TenantPreferenceID undefined. Cannot patch'
      )
    }
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleGenderChange = (e) => {
    const value = e.target.value
    if (value === 'self-describe') {
      setCustomGender(customGender)
      dispatch(updateTenant({ Gender: customGender }))
    } else {
      setCustomGender('')
      dispatch(updateTenant({ Gender: value }))
    }
  }

  const handleCustomGenderChange = (e) => {
    const value = e.target.value
    setCustomGender(value)
    dispatch(updateTenant({ Gender: value }))
  }

  return (
    <>
      {isEditing ? (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '80ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="general-input-form"
        >
          <h1>Landlords need to know your ... </h1>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-number"
                className="age-field"
                label="Age"
                variant="filled"
                required
                type="number"
                name="Age"
                value={tenant.Age || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid>
              <FormControl margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Gender*
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  name="Gender"
                  value={
                    tenant.Gender === customGender
                      ? 'self-describe'
                      : tenant.Gender || ''
                  }
                  onChange={handleGenderChange}
                  required
                  label="Gender"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Non-binary">Non-binary</MenuItem>
                  <MenuItem value="self-describe">
                    Prefer to self-describe
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                className="gender-field"
                label="If you select self-declared, please indicate here"
                variant="filled"
                name="customGender"
                value={customGender || ''}
                onChange={handleCustomGenderChange}
                placeholder="Enter gender here..."
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="occupation-field"
                label="Occupation"
                variant="filled"
                name="Occupation"
                value={tenant.Occupation || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="income-field"
                label="Income in $"
                variant="filled"
                name="Income"
                value={tenant.Income || ''}
                onChange={handleChange}
                placeholder=""
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="company-field"
                label="Company"
                variant="filled"
                name="Company"
                value={tenant.Company || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="habit-field"
                label="Habit"
                variant="filled"
                required
                name="Habit"
                value={tenant.Habit || ''}
                onChange={handleChange}
                placeholder="ex: Early Bird, night owl"
                fullWidth
                margin="normal"
              />
            </Grid>
            <h1>You are looking for rent that ...</h1>
            <Grid item xs={12}>
              <TextField
                className="province-field"
                label="Province"
                variant="filled"
                required
                name="Province"
                value={tenantPref.Province || ''}
                onChange={handleChange}
                placeholder="ex: Ontario"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="city-field"
                label="City"
                variant="filled"
                required
                name="City"
                value={tenantPref.City || ''}
                onChange={handleChange}
                placeholder="ex: Toronto"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="street-field"
                label="Street"
                variant="filled"
                name="Street"
                value={tenantPref.Street || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="expected-price-field"
                label="Expected Price"
                variant="filled"
                type="number"
                name="ExpectedPrice"
                value={tenantPref.ExpectedPrice || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="max-price-field"
                label="Max Price"
                variant="filled"
                type="number"
                name="MaxPrice"
                value={tenantPref.MaxPrice || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="start-date-field"
                label="Start Date"
                variant="filled"
                type="date"
                name="StartDate"
                value={tenantPref.StartDate || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="end-date-field"
                label="End Date"
                variant="filled"
                type="date"
                name="EndDate"
                value={tenantPref.EndDate || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl margin="normal">
                <InputLabel id="duration-select-label">Duration</InputLabel>
                <Select
                  labelId="duration-select-label"
                  id="duration-select"
                  name="Duration"
                  value={tenantPref.Duration || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="<3month">Less than 3 month</MenuItem>
                  <MenuItem value="4months">4 months</MenuItem>
                  <MenuItem value="6months">6 months</MenuItem>
                  <MenuItem value="8months">8 months</MenuItem>
                  <MenuItem value="10months">10 months</MenuItem>
                  <MenuItem value="12months">12 months</MenuItem>
                  <MenuItem value="long-term">Long term</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl margin="normal">
                <InputLabel id="room-type-select-label">Room Type</InputLabel>
                <Select
                  labelId="room-type-select-label"
                  id="room-type-select"
                  name="RoomType"
                  value={tenantPref.RoomType || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Studio">Studio</MenuItem>
                  <MenuItem value="1B1B">1 Bedroom 1 Bathroom</MenuItem>
                  <MenuItem value="2B2B">2 Bedrooms 2 Bathrooms</MenuItem>
                  <MenuItem value="2B1B">2 Bedrooms 1 Bathrooms</MenuItem>
                  <MenuItem value="3B+sB">3 Bedrooms Shared Bathroom</MenuItem>
                  <MenuItem value="3B+3B+">3+ Bedrooms 3+Bathrooms</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tenantPref.isOwnPet || false}
                    onChange={handleChange}
                    name="isOwnPet"
                  />
                }
                label="Allow Pet"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tenantPref.isSmoke || false}
                    onChange={handleChange}
                    name="isSmoke"
                  />
                }
                label="Allow Smoke"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tenantPref.isParty || false}
                    onChange={handleChange}
                    name="isParty"
                  />
                }
                label="Allow Party"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tenantPref.isWeed || false}
                    onChange={handleChange}
                    name="isWeed"
                  />
                }
                label="Allow Weed"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="num-of-parking-field"
                label="Number of Parking"
                variant="filled"
                type="number"
                name="NumOfParking"
                value={tenantPref.NumOfParking || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="num-of-resident-field"
                label="Number of Resident"
                variant="filled"
                type="number"
                name="NumOfResident"
                value={tenantPref.NumOfResident || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
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
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box className="tenant-input-form">
          <Typography variant="h4" className="header">
            Landlords need to know your...
          </Typography>
          <div className="info-grid">
            <Typography className="label">Age</Typography>
            <Typography className="value">{tenant.Age}</Typography>
            <Typography className="label">Gender</Typography>
            <Typography className="value">{tenant.Gender || 'N/A'}</Typography>
            <Typography className="label">Occupation</Typography>
            <Typography className="value">
              {tenant.Occupation || 'N/A'}
            </Typography>
            <Typography className="label">Income</Typography>
            <Typography className="value">{tenant.Income || 'N/A'}</Typography>
            <Typography className="label">Company</Typography>
            <Typography className="value">{tenant.Company || 'N/A'}</Typography>
            <Typography className="label">Habit</Typography>
            <Typography className="value">{tenant.Habit || 'N/A'}</Typography>
          </div>

          <Typography variant="h4" className="header">
            You are looking for rent that...
          </Typography>
          <div className="info-grid">
            <Typography className="label">Province</Typography>
            <Typography className="value">
              {tenantPref.Province || 'N/A'}
            </Typography>
            <Typography className="label">City</Typography>
            <Typography className="value">
              {tenantPref.City || 'N/A'}
            </Typography>
            <Typography className="label">Street</Typography>
            <Typography className="value">
              {tenantPref.Street || 'N/A'}
            </Typography>
            <Typography className="label">Expected Price</Typography>
            <Typography className="value">
              {tenantPref.ExpectedPrice || 'N/A'}
            </Typography>
            <Typography className="label">Max Price</Typography>
            <Typography className="value">
              {tenantPref.MaxPrice || 'N/A'}
            </Typography>
            <Typography className="label">Start Date</Typography>
            <Typography className="value">
              {tenantPref.StartDate || 'N/A'}
            </Typography>
            <Typography className="label">End Date</Typography>
            <Typography className="value">
              {tenantPref.EndDate || 'N/A'}
            </Typography>
            <Typography className="label">Duration</Typography>
            <Typography className="value">
              {tenantPref.Duration || 'N/A'}
            </Typography>
            <Typography className="label">Room Type</Typography>
            <Typography className="value">
              {tenantPref.RoomType || 'N/A'}
            </Typography>
            <Typography className="label">Own Pet</Typography>
            <Typography className="value">
              {tenantPref.isOwnPet ? 'Yes' : 'No'}
            </Typography>
            <Typography className="label">Smoke</Typography>
            <Typography className="value">
              {tenantPref.isSmoke ? 'Yes' : 'No'}
            </Typography>
            <Typography className="label">Party</Typography>
            <Typography className="value">
              {tenantPref.isParty ? 'Yes' : 'No'}
            </Typography>
            <Typography className="label">Weed</Typography>
            <Typography className="value">
              {tenantPref.isWeed ? 'Yes' : 'No'}
            </Typography>
            <Typography className="label">Number of Parking</Typography>
            <Typography className="value">
              {tenantPref.NumOfParking || 'N/A'}
            </Typography>
            <Typography className="label">Number of Resident</Typography>
            <Typography className="value">
              {tenantPref.NumOfResident || 'N/A'}
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={handleEdit}
          >
            Edit Preference
          </Button>
        </Box>
      )}
    </>
  )
}
