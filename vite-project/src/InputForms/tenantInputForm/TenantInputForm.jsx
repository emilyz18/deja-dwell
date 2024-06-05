import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../inputForm.css'

export function TenantInputForm() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const handleAddTenant = (tenant) => {
        console.log("Added tenant info: ", tenant);
    };

    function resetForm() {
        setName("");
        setAge("");
        setGender("");
        setImage("");
        setPhoneNumber("");
        setEmail("");
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newTenant = {
            id: uuidv4(),
            name,
            age,
            gender,
            image,
            phoneNumber,
            email
        };

        handleAddTenant(newTenant);
        resetForm();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1 className="input-form-heading">Enter tenant information below: </h1>
                    <p>Fields marked with <span aria-label="required"> *</span> are required.</p>
                </div>
                <div>
                    <TextField
                        className="name-field"
                        label="Tenant Name"
                        variant="filled"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
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
                        onChange={e => setAge(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        className="gender-field"
                        label="Gender"
                        variant="filled"
                        required
                        value={gender}
                        onChange={e => setGender(e.target.value)}
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
                        onChange={e => setImage(e.target.value)}
                        placeholder="Enter Image URL here..."
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        className="phoneNumber-field"
                        label="Phone Number"
                        variant="filled"
                        required
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
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
                        onChange={e => setEmail(e.target.value)}
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
                        Add Tenant
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
            </form>
        </div>
    );
}
