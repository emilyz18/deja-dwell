import { BaseSideBar } from './BaseSideBar.jsx'

const landlordLinks = [
  { path: '/landlordAccount/profile', label: 'Edit Profile' },
  { path: '#', label: 'Edit Preference' },
  { path: '/landlordAccount/applicants', label: 'View Applicants' },
]

// import { mockUser } from "../../mockData/mockUser"
export function LandLordSideBar({ accountType, profile, onSwitchAcc }) {
  return (
    <>
      <div>
        <BaseSideBar
          accountType={accountType}
          navBarLinks={landlordLinks}
          profile={profile}
          onSwitchAcc={onSwitchAcc}
        />
      </div>
    </>
  )
}
