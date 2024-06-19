import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import { Box, Typography, List, ListItem } from '@mui/material';
import { Grid } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { getUserAsync, editUserAsync } from '../redux/user/thunks.js';
import { updateUser } from '../redux/user/reducer.js';

import "./inputForm.css"


export function GeneralInputForm() {
    const [isEditing, setIsEditing] = useState(false);


    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();


    useEffect(() => {
        if (user && user.UserID) {
            dispatch(getUserAsync(user.UserID));
        }
    }, [dispatch, user.UserID]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        // overwite with the field that is changed 
        const newUserData = { ...user, [name]: value };
        dispatch(updateUser(newUserData)); // Update user in reducer locally
    };

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleCancel = () => {
        setIsEditing(false);
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(editUserAsync(user));
        setIsEditing(false);
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

    const StyledTypography = styled(Typography)(({ theme }) => ({
        marginBottom: theme.spacing(2),
    }));

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
                                    name="UserName"
                                    value={user.UserName || ""}
                                    onChange={handleChange}
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
                                    name="ProfileImg"
                                    value={user.ProfileImg || ""}
                                    onChange={handleChange}
                                    placeholder="Enter Image URL here..."
                                    fullWidth
                                    margin="normal"
                                />
                                <Button
                                    value={user.ProfileImg || ""}
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
                                    name="PhoneNumber"
                                    value={user.PhoneNumber || ""}
                                    onChange={handleChange}
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
                                    name="UserEmail"
                                    value={user.UserEmail || ""}
                                    onChange={handleChange}
                                    placeholder="Enter email here..."
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
                        <Box className="general-input-form">
                            <Typography variant="h4" className="header">My Profile</Typography>
                            <List>
                                <ListItem className="list-item">
                                    <Typography>Name: {user.UserName || 'N/A'}</Typography>
                                </ListItem>
                                <ListItem className="list-item">
                                    <Typography>Phone Number: {user.PhoneNumber || 'N/A'}</Typography>
                                </ListItem>
                                <ListItem className="list-item">
                                    <Typography>Email: {user.UserEmail || 'N/A'}</Typography>
                                </ListItem>
                                <ListItem className="list-item">
                                    <Button variant="contained" color="primary" onClick={handleEdit} className="button">
                                        Edit Profile
                                    </Button>
                                </ListItem>
                            </List>
                        </Box>

                )
            }
        </>



    )
}
