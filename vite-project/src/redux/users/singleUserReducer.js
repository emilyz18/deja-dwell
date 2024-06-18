import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid' 

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: uuidv4(),
        name: '',
        image: '',
        phoneNumber: '',
        email: '',
        isEditing: false,
    },
    reducers: {
        setName: (state, action) => { state.name = action.payload; },
        setImage: (state, action) => { state.image = action.payload; },
        setPhoneNumber: (state, action) => { state.phoneNumber = action.payload; },
        setEmail: (state, action) => { state.email = action.payload; },
        setIsEditing: (state, action) => { state.isEditing = action.payload; },
        resetForm: (state) => {
            state.name = '';
            state.image = '';
            state.phoneNumber = '';
            state.email = '';
        },
    },
});

export const { setName, setImage, setPhoneNumber, setEmail, setIsEditing, resetForm } = userSlice.actions;

export default userSlice.reducer;
