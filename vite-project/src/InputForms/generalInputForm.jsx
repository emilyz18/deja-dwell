import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

export function GeneralInputForm() {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

    const handleAddLandlord = (landlord) => {
        console.log('Added landlord info: ', landlord)
    }

    function resetForm() {
        setName('')
        setAge('')
        setGender('')
        setImage('')
        setPhoneNumber('')
        setEmail('')
    }

    function handleSubmit(event) {
        event.preventDefault()

        const newLandlord = {
            id: uuidv4(),
            name,
            age,
            gender,
            image,
            phoneNumber,
            email,
        }

        handleAddLandlord(newLandlord)
        resetForm()
    }

    // for file upload button
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
    });

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1 className="input-form-heading">
                        My Profile{' '}
                    </h1>
                    <p>
                        Fields marked with <span aria-label="required"> *</span> are
                        required.
                    </p>
                </div>
                <div>
                    <TextField
                        className="name-field"
                        label="Landlord Name"
                        variant="filled"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name here..."
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        className="age-field"
                        label="Age"
                        variant="filled"
                        required
                        type="string"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </div>

                {/* gender drop down */}
                <div>
                    <FormControl sx={{ m: 0, minWidth: 80}}>
                        <InputLabel id="demo-simple-select-autowidth-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            autoWidth
                            label="Gender"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Non-binary"}>Non-binary</MenuItem>
                            <MenuItem value={"self-describe"}>Prefer to self-describe</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <TextField
                        className="gender-field"
                        label="If you select self-declared, please indicate here"
                        variant="filled"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        placeholder="Enter gender here..."
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        className="image-field"
                        label="Image URL"
                        variant="filled"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Enter Image URL here..."
                        fullWidth
                        margin="normal"
                    />
                </div>
                {/* file upload  */}
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    // startIcon={<CloudUploadIcon />}
                >
                    Upload Photo
                    <VisuallyHiddenInput type="file" />
                </Button>

                <div>
                    <TextField
                        className="phoneNumber-field"
                        label="Phone Number"
                        variant="filled"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number here..."
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        className="email-field"
                        label="Email"
                        variant="filled"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email here..."
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div className="button">
                    <Button
                        className="submit-button"
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                </div>
                <div className="button">
                    <Button
                        className="clear-fields-button"
                        type="reset"
                        variant="contained"
                        color="secondary"
                        onClick={resetForm}
                    >
                        Clear Fields
                    </Button>
                </div>
                <div className="button">
                    <Button
                        className="edit-button"
                        type="reset"
                        variant="contained"
                        color="secondary"
                        onClick={resetForm}
                    >
                        Edit Profile
                    </Button>
                </div>
            </form>
        </div>
    )
}
