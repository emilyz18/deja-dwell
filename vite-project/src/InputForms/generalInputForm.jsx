import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';

import { setName,setImage, setPhoneNumber, setEmail, setIsEditing, resetForm } from "../redux/users/singleUserReducer.js"

import { getUserByIdAsync, patchUserAsync } from '../redux/users/thunks.js';


export function GeneralInputForm() {
    // TODO: how to select current user
    const {
        id, 
        name,
        image,
        phoneNumber,
        email,
        isEditing
    } = useSelector((state) => state.singleUser);

    const dispatch = useDispatch();

    let curId = "8f14e45f-ceea-48d9-b10d-dc55bcf4fd70"; // temporary 
    useEffect(() => {
        dispatch(getUserByIdAsync(curId));
    }, [dispatch, curId]);

    const handleEdit = () => {
        dispatch(setIsEditing(true));
    }

    const handleCancel = () => {
        dispatch(setIsEditing(false));
    }


    // const handleAddUser = (user) => {
    //     console.log('Added user info: ', user)
    //     putUserAsync()
    // }


    function handleSubmit(event) {
        event.preventDefault()

        const newUserData = {
            id,
            name,
            image,
            phoneNumber,
            email,
        }

        dispatch(patchUserAsync(newUserData));
        
    }

    // for file upload button, from material UI documantation
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

        <>
            {
                isEditing ? (


                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '80ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <h1>My profile </h1>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    className="name-field"
                                    label="Full Name"
                                    variant="filled"
                                    required
                                    value={name}
                                    onChange={(e) => dispatch(setName(e.target.value))}
                                    placeholder="Enter name here..."
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    className="image-field"
                                    label="Image URL"
                                    variant="filled"
                                    value={image}
                                    onChange={(e) => dispatch(setImage(e.target.value))}
                                    placeholder="Enter Image URL here..."
                                    fullWidth
                                    margin="normal"
                                />
                                <Button
                                    component="label"
                                    variant="contained"
                                >
                                    Upload Photo
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className="phoneNumber-field"
                                    label="Phone Number"
                                    variant="filled"
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
                                    placeholder="Enter phone number here..."
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className="email-field"
                                    label="Email"
                                    variant="filled"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => dispatch(setEmail(e.target.value))}
                                    placeholder="Enter email here..."
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
                                    onClick={handleSubmit}
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

                        <Typography variant="h1">My Profile</Typography>
                        <Typography variant="h2">Name: {name || 'N/A'}</Typography>
        
                        <Typography>Phone Number: {phoneNumber || 'N/A'}</Typography>
                        <Typography>Email: {email || 'N/A'}</Typography>
                        <Button variant="contained" color="primary" onClick={handleEdit}>
                            Edit Profile
                        </Button>
                    </Box>

                )
            }
        </>



    )
}
