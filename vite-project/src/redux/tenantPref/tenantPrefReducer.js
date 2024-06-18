import { createSlice } from '@reduxjs/toolkit';

export const tenantSlice = createSlice({
    name: 'tenant',
    initialState: {
        age: 0,
        gender: '',
        occupation: '',
        company: '',
        income: 0,
        habit: '',
        province: '',
        city: '',
        street: '',
        expectedPrice: 0,
        maxPrice: 0,
        startDate: '',
        endDate: '',
        duration: '',
        roomType: '',
        isOwnPet: false,
        isSmoke: false,
        isParty: false,
        isWeed: false,
        numOfParking: 0,
        numOfResident: 0,
    },
    reducers: {
        updateTenant: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetTenant: () => {
            return {
                age: 0,
                gender: '',
                occupation: '',
                company: '',
                income: 0,
                habit: '',
                province: '',
                city: '',
                street: '',
                expectedPrice: 0,
                maxPrice: 0,
                startDate: '',
                endDate: '',
                duration: '',
                roomType: '',
                isOwnPet: false,
                isSmoke: false,
                isParty: false,
                isWeed: false,
                numOfParking: 0,
                numOfResident: 0,
            };
        },
    },
});

export const { updateTenant, resetTenant } = tenantSlice.actions;
export default tenantSlice.reducer;
