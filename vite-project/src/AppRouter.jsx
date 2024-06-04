
import React from "react";
import { BrowserRounter, Routes, Route } from "react-rounter-dom";

import { LandlordPropertyCard } from './components/landlordPropertyCard/LandlordPropertyCard'; 

export function AppRouter() {
    return (
        <BrowserRounter>
            <Routes>
                <Route path='/components/landlordPropertyCard' element={<LandlordPropertyCard />}/>
                {/* need route for tenant card */}
            </Routes>
        </BrowserRounter>
    )
}
