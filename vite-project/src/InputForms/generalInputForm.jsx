import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import { Box, Typography, List, ListItem } from '@mui/material';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import { useSelector, useDispatch } from 'react-redux';
import { getUserAsync, editUserAsync } from '../redux/user/thunks.js';
import { updateUser } from '../redux/user/reducer.js';

import "./inputForm.css"

export const defaultProfilePath = "../../public/images/default_profile_pic.jpg"

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

    //adpt form tutorial
    //https://nikolasbarwicki.com/articles/how-to-display-a-preview-of-an-image-upload-in-react/#:~:text=of%20the%20FileReader.-,React%20Example,-In%20a%20React 
    const handlePicFileUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const curFile = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(updateUser({ ...user, ProfileImg: reader.result }));
            };
            reader.readAsDataURL(curFile);
        }
    }

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
                        className='general-input-form'
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
                                    <VisuallyHiddenInput type="file" accept="image/*"  onChange={handlePicFileUpload} />
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
                                    className="button"
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

                            <Avatar
                                alt="user profile"
                                src={user.ProfileImg || defaultProfilePath}
                                sx={{ marginTop: 10, width: 200, height: 200 }}
                            />    
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
