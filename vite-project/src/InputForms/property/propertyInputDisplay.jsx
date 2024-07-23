import { Box, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button'
import Carousel from '../../components/carousel/Carousel';
export function PropertyInputDisplay({ property, handleEdit }) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA');
    };

    
    return (<Box className="tenant-input-form">
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
            <Typography className="value">{property.ExpectedPrice || '0'}</Typography>
            <Typography className="label">Start Date</Typography>
            <Typography className="value">{property.StartDate ? formatDate(property.StartDate) : 'N/A'}</Typography>
            <Typography className="label">End Date</Typography>
            <Typography className="value">{property.EndDate ? formatDate(property.EndDate) : 'N/A'}</Typography>

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
    </Box>);
    
}