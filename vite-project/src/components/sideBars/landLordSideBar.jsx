import { BaseSidebar } from "./baseSideBar";


const landlordLinks = [
    { path: "#", label: "Edit Preference" },
    { path: "/components/landlordPropertyCard", label: "View Applicants" }
];


// import { mockUser } from "../../mockData/mockUser"
export function LandLordSideBar({ accountType, profile, onSwitchAcc}) {

    return (
        <>
            <div>
                <BaseSidebar accountType={accountType} navBarLinks={landlordLinks} profile={profile} onSwitchAcc={onSwitchAcc} />
            </div>
        </>
    );

}
    
    
    

