import {
    Box,
    Button,
    Typography,
} from '@mui/material'
export function TenantInputDisplay({ tenant, tenantPref, handleEdit }) {
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA');
    };
    
    return (<Box className="tenant-input-form">
        <Typography variant="h4" className="header">
            Landlords need to know your...
        </Typography>
        <div className="info-grid">
            <Typography className="label">Age</Typography>
            <Typography className="value">{tenant.Age || 0}</Typography>
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

            <Typography className="label">Max Price</Typography>
            <Typography className="value">
                {tenantPref.MaxPrice || 'N/A'}
            </Typography>
            <Typography className="label">Start Date</Typography>
            <Typography className="value">
                {tenantPref.StartDate ? formatDate(tenantPref.StartDate) : 'N/A'}
            </Typography>
            <Typography className="label">End Date</Typography>
            <Typography className="value">
                {tenantPref.EndDate ? formatDate(tenantPref.EndDate) :'N/A'}
            </Typography>

            <Typography className="label">Number of Bedroom</Typography>
            <Typography className="value">
                {tenantPref.NumBedroom || 'N/A'}
            </Typography>
            <Typography className="label">Number of Bathroom</Typography>
            <Typography className="value">
                {tenantPref.NumBathroom || 'N/A'}
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
            <Typography className="label">AC included</Typography>
            <Typography className="value">
                {tenantPref.isAC ? 'Yes' : 'No'}
            </Typography>
            <Typography className="label">Heater included</Typography>
            <Typography className="value">
                {tenantPref.isHeater ? 'Yes' : 'No'}
            </Typography>
            <Typography className="label">Furnished</Typography>
            <Typography className="value">
                {tenantPref.isFurnished ? 'Yes' : 'No'}
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
    </Box>)

}