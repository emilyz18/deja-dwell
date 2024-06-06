import { BaseSideBar } from "./BaseSideBar.jsx";


const tenantLinks = [
    { path: "#", label: "Edit Profile" },
    { path: "#", label: "Edit Preference" },
    { path: "#", label: "See Matches" },
    { path: "#", label: "View Applied History" }
];


// import { mockUser } from "../../mockData/mockUser"
export function TenantSideBar({ accountType, profile, onSwitchAcc }) {

    return (
        <>
            <div>
                <BaseSideBar accountType={accountType} navBarLinks={tenantLinks} profile={profile} onSwitchAcc={onSwitchAcc} />
            </div>
        </>
    );

}