import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { getLandlordAsync } from '../../redux/landlord/thunks.js';
import { getPropertyByIdAsync, patchPropertyAsync, createPropertyAsync } from '../../redux/properties/thunks.js';
import { updateProperty } from '../../redux/properties/reducer.js';
import { PropertyForm } from './propertyForm.jsx';
import { PropertyInputDisplay } from './propertyInputDisplay.jsx'

export function PropertyEditPage() {
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
                <PropertyForm property={property} handleSubmit={handleSubmit} handleChange={handleChange} handleCancel={handleCancel} handleImageChange={handleImageChange} />
            )}
            {!isEditing && !isCreating && property.HouseID && (
                <PropertyInputDisplay
                    property={property}
                    handleEdit={handleEdit}
                />
            )}
        </>
    );
}
