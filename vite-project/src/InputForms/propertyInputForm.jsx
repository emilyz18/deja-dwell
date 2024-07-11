// t
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {
    Box,
    Grid,
    Typography,
    Checkbox,
    FormControlLabel,
} from '@mui/material'
import { getLandlordAsync } from '../redux/landlord/thunks'
import { getPropertyByIdAsync, patchPropertyAsync } from '../redux/properties/thunks'
import {updateProperty} from '../redux/properties/reducer.js'


export function PropertyInputForm() {

    const [isEditing, setIsEditing] = useState(false)

    const dispatch = useDispatch();

    // for user reducer
    const landlordID = useSelector((state) => state.user.user.LandlordID)
    // console.log("landlord id: ", landlordID); //ok
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const landlord= useSelector((state) => state.landlord.landlord)
    const property = useSelector((state) => state.properties.property)

    // get object in landlord collection
    useEffect(() => {
        if (isAuthenticated && landlordID) {
            dispatch(getLandlordAsync(landlordID))
        }
    }, [dispatch, isAuthenticated, landlordID])

    console.log("landlord object:", landlord);

    // get house 
    useEffect(() => {
        if (isAuthenticated && landlord && landlord.HouseID) {
            dispatch(getPropertyByIdAsync(landlord.HouseID))
        }
    }, [dispatch, isAuthenticated, landlord])

    // update property in reducer
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (name in property) {
            dispatch(updateProperty({ [name]: type === 'checkbox' ? checked : value }))
        }
    }

    // update property in DB
    const handleSubmit = (event) => {
        event.preventDefault()
        if (landlord && landlord.HouseID) {
            dispatch(patchPropertyAsync({ HouseID: landlord.HouseID, property }));
            setIsEditing(false);
        } else {
            console.error('Landlord or HouseID is undefined. Cannot patch property');
        }
    }

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    if (!landlord || !property) {
        return <div>Loading... It is definatly not broken</div>;
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
                    <h1>Input Your Property Information </h1>
                    <Grid item xs={12}>
                        <TextField
                            className="title-field"
                            label="Title"
                            variant="filled"
                            required
                            name="Title"
                            value={property.Title || ''}
                            onChange={handleChange}
                            placeholder="Please be specific"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className="province-field"
                            label="Province"
                            variant="filled"
                            required
                            name="Province"
                            value={property.Province || ''}
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
                            value={property.City || ''}
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
                            value={property.Street || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="filled-multiline-static"
                            className="description-field"
                            label="Description"
                            variant="filled"
                            name="Description"
                            value={property.Description || ''}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            maxRows={4}
                            margin="normal" minRows={4} />

                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            className="price-field"
                            label="Rent Per Month"
                            variant="filled"
                            type="number"
                            name="Price"
                            value={property.ExpectedPrice || ''}
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
                            value={property.StartDate || ''}
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
                            value={property.EndDate || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            className="num-of-bedroom"
                            label="Number of Bedroom"
                            variant="filled"
                            type="number"
                            name="NumBedroom"
                            value={property.NumBedroom || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            className="num-of-bathroom"
                            label="Number of Bathroom"
                            variant="filled"
                            type="number"
                            name="NumBathroom"
                            value={property.NumBathroom || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property.isOwnPet || false}
                                    onChange={handleChange}
                                    name="isOwnPet"
                                />
                            }
                            label="Allow Pet"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property.isSmoke || false}
                                    onChange={handleChange}
                                    name="isSmoke"
                                />
                            }
                            label="Allow Smoke"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property.isParty || false}
                                    onChange={handleChange}
                                    name="isParty"
                                />
                            }
                            label="Allow Party"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property.isWeed || false}
                                    onChange={handleChange}
                                    name="isWeed"
                                />
                            }
                            label="Allow Weed"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property.isAC || false}
                                    onChange={handleChange}
                                    name="isAC"
                                />
                            }
                            label="AC included"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property.isHeater || false}
                                    onChange={handleChange}
                                    name="isHeater"
                                />
                            }
                            label="Heater included"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property.isFurnished || false}
                                    onChange={handleChange}
                                    name="isFurnished"
                                />
                            }
                            label="Furnished"
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <TextField
                            className="num-of-parking-field"
                            label="Number of Parking"
                            variant="filled"
                            type="number"
                            name="NumOfParking"
                            value={property.NumOfParking || ''}
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
                            value={property.NumOfResident || ''}
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
                            Publish
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
                </Box>
            ) : (
                <Box className="tenant-input-form">
                    <Typography variant="h4" className="header">
                        Your Property Information
                    </Typography>
                    <div className="info-grid">
                        <Typography className="label">Title</Typography>
                        
                            <Typography className="value">{property.Title}</Typography>

                        <Typography className="label">Province</Typography>
                        <Typography className="value">
                                {property.Province || 'N/A'}
                        </Typography>
                        <Typography className="label">City</Typography>
                        <Typography className="value">
                                {property.City || 'N/A'}
                        </Typography>
                        <Typography className="label">Street</Typography>
                        <Typography className="value">
                                {property.Street || 'N/A'}
                        </Typography>



                        <Typography className="label">Rent Per Month</Typography>
                        <Typography className="value">
                                {property.ExpectedPrice || 'N/A'}
                        </Typography>
                        <Typography className="label">Start Date</Typography>
                        <Typography className="value">
                                {property.StartDate || 'N/A'}
                        </Typography>
                        <Typography className="label">End Date</Typography>
                        <Typography className="value">
                                {property.EndDate || 'N/A'}
                        </Typography>

                        <Typography className="label">Number of Bedroom</Typography>
                        <Typography className="value">
                                {property.NumBedroom || 'N/A'}
                        </Typography>
                        <Typography className="label">Number of Bathroom</Typography>
                        <Typography className="value">
                                {property.NumBathroom || 'N/A'}
                        </Typography>
                        <Typography className="label">Own Pet</Typography>
                        <Typography className="value">
                                {property.isOwnPet ? 'Yes' : 'No'}
                        </Typography>
                        <Typography className="label">Smoke</Typography>
                        <Typography className="value">
                                {property.isSmoke ? 'Yes' : 'No'}
                        </Typography>
                        <Typography className="label">Party</Typography>
                        <Typography className="value">
                                {property.isParty ? 'Yes' : 'No'}
                        </Typography>
                        <Typography className="label">Weed</Typography>
                        <Typography className="value">
                                {property.isWeed ? 'Yes' : 'No'}
                        </Typography>
                        <Typography className="label">AC included</Typography>
                        <Typography className="value">
                                {property.isAC ? 'Yes' : 'No'}
                        </Typography>
                        <Typography className="label">Heater included</Typography>
                        <Typography className="value">
                                {property.isHeater ? 'Yes' : 'No'}
                        </Typography>
                        <Typography className="label">Furnished</Typography>
                        <Typography className="value">
                                {property.isFurnished ? 'Yes' : 'No'}
                        </Typography>

                        <Typography className="label">Number of Parking</Typography>
                        <Typography className="value">
                                {property.NumOfParking || 'N/A'}
                        </Typography>
                        <Typography className="label">Number of Resident</Typography>
                        <Typography className="value">
                                {property.NumOfResident || 'N/A'}
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
