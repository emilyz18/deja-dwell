import { useState } from 'react'
import {
    updateTenant,
    updateTenantPref,
} from '../../redux/tenant/tenantReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import {
    Box,
    Grid,
    Checkbox,
    FormControlLabel,
} from '@mui/material'
import './TenantInputForm.css'
export function TenantForm({ handleSubmit, tenant, tenantPref, handleChange, handleCancel }) {


    const [customGender, setCustomGender] = useState('');
    const dispatch = useDispatch()

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];  
    };

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

    const [errors, setErrors] = useState({});
    const validate = () => {
        let tempErrors = {};
        if (!tenant.Gender) tempErrors.Gender = "Gender is required";
        if (!tenant.Habit) tempErrors.Habit = "Your daily habit is required to get a better match";
        if (!tenantPref.Province) tempErrors.Province = "Your preferred province is required to get a better match";
        if (!tenantPref.City) tempErrors.City = "Your preferred city is required to get a better match";
        if (tenant.Gender === 'self-describe' && !customGender) tempErrors.Gender = "Please describe your gender";
        if (!tenant.Gender === '') tempErrors.Gender = "Please select your gender";

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
        sx={{
            '& .MuiTextField-root': { m: 1, width: '80ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
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
                    {!!errors.Gender && <p className="error-text">{errors.Gender}</p>}
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
                    error={!!errors.Gender}
                    helperText={errors.Gender}
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
                    error={!!errors.Habit}
                    helperText={errors.Habit}

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
                    error={!!errors.Province}
                    helperText={errors.Province}

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
                    error={!!errors.City}
                    helperText={errors.City}
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
                    className="max-price-field"
                    label="Maximum Price"
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
                    value={formatDate(tenantPref.StartDate) || ''}
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
                    value={formatDate(tenantPref.EndDate) || ''}
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
                    value={tenantPref.NumBedroom || ''}
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
                    value={tenantPref.NumBathroom || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
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

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={tenantPref.isAC || false}
                            onChange={handleChange}
                            name="isAC"
                        />
                    }
                    label="AC included"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={tenantPref.isHeater || false}
                            onChange={handleChange}
                            name="isHeater"
                        />
                    }
                    label="Heater included"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={tenantPref.isFurnished || false}
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
    </Box>)
}