import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { getLandlordAsync } from '../redux/landlord/thunks';
import { getPropertyByIdAsync, patchPropertyAsync, createPropertyAsync } from '../redux/properties/thunks';
import { updateProperty } from '../redux/properties/reducer.js';
import Carousel from '../components/carousel/Carousel';

export function PropertyInputForm() {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const dispatch = useDispatch();
    const LandlordID = useSelector((state) => state.user.user.LandlordID);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const landlord = useSelector((state) => state.landlord.landlord);
    const property = useSelector((state) => state.properties.property);

    useEffect(() => {
        if (isAuthenticated && LandlordID) {
            dispatch(getLandlordAsync(LandlordID));
        }
    }, [dispatch, isAuthenticated, LandlordID]);

    useEffect(() => {
        if (landlord.LandlordID && landlord.HouseID) {
            dispatch(getPropertyByIdAsync(landlord.HouseID));
        }
    }, [dispatch, landlord.LandlordID, landlord.HouseID]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        dispatch(updateProperty({ [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestData = {
            LandlordID: LandlordID,
            HouseID: landlord.HouseID,
            ...property,
        }; 
        // console.log('Request Data in hanfle sumit in property input:', requestData); // Debugging line

        if (property.HouseID) {
            dispatch(patchPropertyAsync({ HouseID: landlord.HouseID, property: requestData }));
        } else {
            await dispatch(createPropertyAsync(requestData));
            await dispatch(getPropertyByIdAsync(landlord.HouseID));
        }

        setIsEditing(false);
        setIsCreating(false);
    };


    const handleCreateNewPost = () => {
        setIsEditing(true);
        setIsCreating(true);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setIsCreating(false);
    };

    const handleImageChange = (index, field, event) => {
        const newImages = [...property.HouseImgs];
        newImages[index] = { ...newImages[index], [field]: event.target.value };
        dispatch(updateProperty({ HouseImgs: newImages }));
    };

    if (!landlord) {
        return <div>Loading... It is definitely not broken</div>;
    }

    return (
        <>
            {(!property.HouseID || isCreating) ? (
                <Button variant="contained" color="primary" onClick={handleCreateNewPost}>
                    Create New Post
                </Button>
            ) : null}

            {(isEditing || isCreating) && (
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '80ch' } }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h4" gutterBottom>
                        Input Your Property Information
                    </Typography>

                    <Grid item xs={12}>
                        <TextField
                            label="Title"
                            variant="filled"
                            required
                            name="Title"
                            value={property.Title || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    <Grid container spacing={4}>
                        {(property.HouseImgs || [{ src: '', alt: '' }, { src: '', alt: '' }, { src: '', alt: '' }]).map((image, index) => (
                            <Grid item xs={12} key={index}>
                                <TextField
                                    label={`Image URL ${index + 1}`}
                                    value={image.src}
                                    onChange={(e) => handleImageChange(index, 'src', e)}
                                    fullWidth
                                />
                                <TextField
                                    label={`Image Alt Text ${index + 1}`}
                                    value={image.alt}
                                    onChange={(e) => handleImageChange(index, 'alt', e)}
                                    fullWidth
                                />
                                {image.src && (
                                    <Box position="relative" marginTop={2}>
                                        <img src={image.src} alt={image.alt} width="100%" height="100%" style={{ objectFit: 'cover' }} />
                                    </Box>
                                )}
                            </Grid>
                        ))}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Province"
                            variant="filled"
                            required
                            name="Province"
                            value={property.Province || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="City"
                            variant="filled"
                            required
                            name="City"
                            value={property.City || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Street"
                            variant="filled"
                            name="Street"
                            value={property.Street || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            variant="filled"
                            name="Description"
                            value={property.Description || ''}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Rent Per Month"
                            variant="filled"
                            type="number"
                            name="ExpectedPrice"
                            value={property.ExpectedPrice || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Start Date"
                            variant="filled"
                            type="date"
                            name="StartDate"
                            value={property.StartDate || ''}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="End Date"
                            variant="filled"
                            type="date"
                            name="EndDate"
                            value={property.EndDate || ''}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property.AllowPet || false}
                                    onChange={handleChange}
                                    name="AllowPet"
                                />
                            }
                            label="Allow Pet"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property.AllowSmoke || false}
                                    onChange={handleChange}
                                    name="AllowSmoke"
                                />
                            }
                            label="Allow Smoke"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property.AllowParty || false}
                                    onChange={handleChange}
                                    name="AllowParty"
                                />
                            }
                            label="Allow Party"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property.AllowWeed || false}
                                    onChange={handleChange}
                                    name="AllowWeed"
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
                            label="Number of Parking"
                            variant="filled"
                            type="number"
                            name="NumOfParking"
                            value={property.NumOfParking || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Number of Resident"
                            variant="filled"
                            type="number"
                            name="NumOfResident"
                            value={property.NumOfResident || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Publish
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Box>
            )}

            {!isEditing && !isCreating && property.HouseID && (
                <Box className="tenant-input-form">
                    <Typography variant="h4" className="header">
                        Your Property Information
                    </Typography>
                    <div className="info-grid">
                        <Typography className="label">Title</Typography>
                        <Typography className="value">{property.Title}</Typography>

                        <Typography className="label">Province</Typography>
                        <Typography className="value">{property.Province || 'N/A'}</Typography>
                        <Typography className="label">City</Typography>
                        <Typography className="value">{property.City || 'N/A'}</Typography>
                        <Typography className="label">Street</Typography>
                        <Typography className="value">{property.Street || 'N/A'}</Typography>

                        <Typography className="label">Images</Typography>
                        <Carousel
                            data={property.HouseImgs}
                            size={{ width: '400px', height: '240px' }}
                        />

                        <Typography className="label">Rent Per Month</Typography>
                        <Typography className="value">{property.ExpectedPrice || 'N/A'}</Typography>
                        <Typography className="label">Start Date</Typography>
                        <Typography className="value">{property.StartDate || 'N/A'}</Typography>
                        <Typography className="label">End Date</Typography>
                        <Typography className="value">{property.EndDate || 'N/A'}</Typography>

                        <Typography className="label">Number of Bedroom</Typography>
                        <Typography className="value">{property.NumBedroom || 'N/A'}</Typography>
                        <Typography className="label">Number of Bathroom</Typography>
                        <Typography className="value">{property.NumBathroom || 'N/A'}</Typography>
                        <Typography className="label">Own Pet</Typography>
                        <Typography className="value">{property.AllowPet ? 'Yes' : 'No'}</Typography>
                        <Typography className="label">Smoke</Typography>
                        <Typography className="value">{property.AllowSmoke ? 'Yes' : 'No'}</Typography>
                        <Typography className="label">Party</Typography>
                        <Typography className="value">{property.AllowParty ? 'Yes' : 'No'}</Typography>
                        <Typography className="label">Weed</Typography>
                        <Typography className="value">{property.AllowWeed ? 'Yes' : 'No'}</Typography>
                        <Typography className="label">AC included</Typography>
                        <Typography className="value">{property.isAC ? 'Yes' : 'No'}</Typography>
                        <Typography className="label">Heater included</Typography>
                        <Typography className="value">{property.isHeater ? 'Yes' : 'No'}</Typography>
                        <Typography className="label">Furnished</Typography>
                        <Typography className="value">{property.isFurnished ? 'Yes' : 'No'}</Typography>

                        <Typography className="label">Number of Parking</Typography>
                        <Typography className="value">{property.NumOfParking || 'N/A'}</Typography>
                        <Typography className="label">Number of Resident</Typography>
                        <Typography className="value">{property.NumOfResident || 'N/A'}</Typography>
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
    );
}
