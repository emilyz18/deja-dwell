// image preview method guided by chaptgpt 4o with prompt: how to create image preview for each URL input textfield, generated code applied to handleImageChange() 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
export function PropertyForm({ property, handleSubmit, handleChange, handleCancel, handleImageChange }) {
    const emptyImageArray = [{ src: '', alt: '' }, { src: '', alt: '' }, { src: '', alt: '' }]
    const [errors, setErrors] = useState({});
    const validate = () => {
        let tempErrors = {};
        if (!property.Title) tempErrors.Title = "Title is required";
        if (!property.Province) tempErrors.Province = "Province is required";
        if (!property.City) tempErrors.City = "City is required";
        if (!property.ExpectedPrice) tempErrors.ExpectedPrice = "Rent Per Month is required";

        const validImages = (property.HouseImgs).filter(image => image.src !== '');
        if (validImages.length < 3) tempErrors.HouseImgs = "At least 3 images are required so that tenant to get a detailed view of your property";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            handleSubmit(event);
        }
    };

    return (<Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '80ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
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
                error={!!errors.Title} 
                helperText={errors.Title}
            />
        </Grid>


        <Grid container spacing={4}>
            {(property.HouseImgs || emptyImageArray).map((image, index) => (
                <Grid item xs={12} key={index}>
                    <TextField
                        label={`Image URL ${index + 1}`}
                        value={image.src}
                        onChange={(e) => handleImageChange(index, 'src', e)}
                        fullWidth
                        error={!!errors.HouseImgs}
                        helperText={errors.HouseImgs}
                    />
                    <TextField
                        label={`Image Alt Text ${index + 1}`}
                        value={image.alt}
                        onChange={(e) => handleImageChange(index, 'alt', e)}
                        fullWidth
                    />
                    {image.src && (
                        <Box position="relative" marginTop={2}>
                            <img src={image.src} alt={image.alt} width="50%" height="50%" style={{ objectFit: 'cover' }} />
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
                error={!!errors.Province}
                helperText={errors.Province}
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
                error={!!errors.City}
                helperText={errors.City}
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
                label="Number of Bedrooms"
                variant="filled"
                type="number"
                name="NumBedroom"
                value={property.NumBedroom || ''}
                onChange={handleChange}
                fullWidth
            />
        </Grid>

        <Grid item xs={12}>
            <TextField
                label="Number of Bathrooms"
                variant="filled"
                type="number"
                name="NumBathroom"
                value={property.NumBathroom || ''}
                onChange={handleChange}
                fullWidth
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
                required
                error={!!errors.ExpectedPrice}
                helperText={errors.ExpectedPrice}

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
    );
    
}