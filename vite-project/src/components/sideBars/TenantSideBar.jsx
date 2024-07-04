import { BaseSideBar } from './BaseSideBar.jsx'

const tenantLinks = [
  { path: '/tenantAccount/profile', label: 'Edit Profile' },
  { path: '/tenantAccount/preference', label: 'Edit Preference' },
  { path: '/tenantAccount/matches', label: 'See Matches' },
  { path: '/tenantAccount/history', label: 'View Applied History' },
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
