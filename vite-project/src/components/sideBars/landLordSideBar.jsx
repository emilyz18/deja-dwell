import { BaseSidebar } from "./baseSideBar";


const landlordLinks = [
    { path: "#", label: "Edit Preference" },
    { path: "/components/landlordPropertyCard", label: "View Applicants" }
];


// import { mockUser } from "../../mockData/mockUser"
export function LandLordSideBar({ profile }) {

    return (
        <>
            <div>
                <BaseSidebar navBarLinks={landlordLinks} profile={profile} />
            </div>
        </>
    );

}
    
    
    

