import { BaseSideBar } from './BaseSideBar.jsx'

const tenantLinks = [
  { path: '/tenantAccount/applicants', label: 'Edit Profile' },
  { path: '#', label: 'Edit Preference' },
  { path: '/tenantAccount/matches', label: 'See Matches' },
  { path: '#', label: 'View Applied History' },
]

export function TenantSideBar({ accountType, profile, onSwitchAcc }) {
  return (
    <>
      <div>
        <BaseSideBar
          accountType={accountType}
          navBarLinks={tenantLinks}
          profile={profile}
          onSwitchAcc={onSwitchAcc}
        />
      </div>
    </>
  )
}
