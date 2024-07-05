import { BaseSideBar } from './BaseSideBar.jsx'
import { LANDLORD } from '../../const.jsx'

const landlordLinks = [
  { path: '/landlordAccount/profile', label: 'Edit Profile' },
  { path: '/landlordAccount/applicants', label: 'View Applicants' },
]

export function LandLordSideBar({ profile }) {
  return (
    <>
      <div>
        <BaseSideBar
          navBarLinks={landlordLinks}
          profile={profile}
          accountType={LANDLORD}
        />
      </div>
    </>
  )
}
