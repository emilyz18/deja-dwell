// input form is generated using Chatgpt with prompt all the data field and data type
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { updateTenant, resetTenant } from '../../redux/tenantPref/tenantPrefReducer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import '../inputForm.css';

export function TenantInputForm() {
  const dispatch = useDispatch();
  const tenantData = useSelector((state) => state.tenant);

  const [customGender, setCustomGender] = useState('');
  const [isEditing, setIsEditing] = useState(false);


  // when input form is changed 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(updateTenant({ [name]: type === 'checkbox' ? checked : value }));
  };

  // when submit button is hit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Updated tenant info: ');
    // to do , call backend probally 
    setIsEditing(false);
  };

  // when edit button is changed : static text -> input form
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    if (value === 'self-describe') {
      setCustomGender(customGender);
      dispatch(updateTenant({ gender: customGender }));
    } else {
      setCustomGender('');
      dispatch(updateTenant({ gender: value }));
    }
  };

  const handleCustomGenderChange = (e) => {
    const value = e.target.value;
    setCustomGender(value);
    dispatch(updateTenant({ gender: value }));
  };

  

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
        >
          <h1>Landlords need to know your </h1>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-number"
                className="age-field"
                label="Age"
                variant="filled"
                required
                type="number"
                name="age"
                value={tenantData.age}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-autowidth-label">Gender *</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  name="gender"
                  value={tenantData.gender === customGender ? 'self-describe' : tenantData.gender}
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
                  <MenuItem value="self-describe">Prefer to self-describe</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                className="gender-field"
                label="If you select self-declared, please indicate here"
                variant="filled"
                name="customGender"
                value={customGender}
                onChange={handleCustomGenderChange}
                placeholder="Enter gender here..."
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="occupation-field"
                label="Occupation"
                variant="filled"
                name="occupation"
                value={tenantData.occupation}
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
                name="income"
                value={tenantData.income}
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
                name="company"
                value={tenantData.company}
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
                name="habit"
                value={tenantData.habit}
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
                name="province"
                value={tenantData.province}
                onChange={handleChange}
                placeholder="ex: BC"
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
                name="city"
                value={tenantData.city}
                onChange={handleChange}
                placeholder="ex: Vancouver"
                fullWidth
                margin="normal"
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                className="street-field"
                label="Street"
                variant="filled"
                name="street"
                value={tenantData.street}
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
                name="expectedPrice"
                value={tenantData.expectedPrice}
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
                name="maxPrice"
                value={tenantData.maxPrice}
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
                name="startDate"
                value={tenantData.startDate}
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
                name="endDate"
                value={tenantData.endDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="duration-select-label">Duration</InputLabel>
                <Select
                  labelId="duration-select-label"
                  id="duration-select"
                  name="duration"
                  value={tenantData.duration}
                  onChange={handleChange}
                >
                  <MenuItem value="1 month"> less than 1 month</MenuItem>
                  <MenuItem value="3 months">4 months</MenuItem>
                  <MenuItem value="6 months">8 months</MenuItem>
                  <MenuItem value="1 year">1 year + </MenuItem>
                  {/* Add other durations as needed */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="room-type-select-label">Room Type</InputLabel>
                <Select
                  labelId="room-type-select-label"
                  id="room-type-select"
                  name="roomType"
                  value={tenantData.roomType}
                  onChange={handleChange}
                >
                  <MenuItem value="Studio">Studio</MenuItem>
                  <MenuItem value="1 Bedroom">1 Bedroom 1 bedroom</MenuItem>
                  <MenuItem value="2 Bedrooms">2 Bedrooms 2 Bathrooms</MenuItem>
                  <MenuItem value="2 Bedrooms">2 Bedrooms 1 Bathrooms</MenuItem>
                  <MenuItem value="2 Bedrooms">3 Bedrooms+ shared Bathroom</MenuItem>
                  <MenuItem value="2 Bedrooms">3+ Bedrooms 3+Bathrooms</MenuItem>


                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={tenantData.isOwnPet} onChange={handleChange} name="isOwnPet" />}
                label="Allow Pet"
              />
              <FormControlLabel
                control={<Checkbox checked={tenantData.isSmoke} onChange={handleChange} name="isSmoke" />}
                label="Allow Smoke"
              />
              <FormControlLabel
                control={<Checkbox checked={tenantData.isParty} onChange={handleChange} name="isParty" />}
                label="Allow Party"
              />
              <FormControlLabel
                control={<Checkbox checked={tenantData.isWeed} onChange={handleChange} name="isWeed" />}
                label="Allow Weed"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="num-of-parking-field"
                label="Number of Parking"
                variant="filled"
                type="number"
                name="numOfParking"
                value={tenantData.numOfParking}
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
                name="numOfResident"
                value={tenantData.numOfResident}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className="submit-button"
                type="submit"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                className="cancel-edit-button"
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
        <Box>
          <Typography variant="h4">Landlord Needs to Know your</Typography>
          <Typography>Age: {tenantData.age || 'N/A'}</Typography>
          <Typography>Gender: {tenantData.gender || 'N/A'}</Typography>
          <Typography>Occupation: {tenantData.occupation || 'N/A'}</Typography>
          <Typography>Income: {tenantData.income || 'N/A'}</Typography>
          <Typography>Company: {tenantData.company || 'N/A'}</Typography>
          <Typography>Habit: {tenantData.habit || 'N/A'}</Typography>
          <Typography>Province: {tenantData.province || 'N/A'}</Typography>
          <Typography>City: {tenantData.city || 'N/A'}</Typography>
          <Typography>Street: {tenantData.street || 'N/A'}</Typography>
          <Typography>Expected Price: {tenantData.expectedPrice || 'N/A'}</Typography>
          <Typography>Max Price: {tenantData.maxPrice || 'N/A'}</Typography>
          <Typography>Start Date: {tenantData.startDate || 'N/A'}</Typography>
          <Typography>End Date: {tenantData.endDate || 'N/A'}</Typography>
          <Typography>Duration: {tenantData.duration || 'N/A'}</Typography>
          <Typography>Room Type: {tenantData.roomType || 'N/A'}</Typography>
          <Typography>Own Pet: {tenantData.isOwnPet ? 'Yes' : 'No'}</Typography>
          <Typography>Smoke: {tenantData.isSmoke ? 'Yes' : 'No'}</Typography>
          <Typography>Party: {tenantData.isParty ? 'Yes' : 'No'}</Typography>
          <Typography>Weed: {tenantData.isWeed ? 'Yes' : 'No'}</Typography>
          <Typography>Number of Parking: {tenantData.numOfParking || 'N/A'}</Typography>
          <Typography>Number of Resident: {tenantData.numOfResident || 'N/A'}</Typography>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Edit Profile
          </Button>
        </Box>
      )}
    </>
  );
}
