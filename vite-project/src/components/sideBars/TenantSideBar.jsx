import { BaseSideBar } from './BaseSideBar.jsx'
import { TENANT } from '../../const.jsx'

const tenantLinks = [
  { path: '/tenantAccount/profile', label: 'Edit Profile' },
  { path: '/tenantAccount/preference', label: 'Edit Preference' },
  { path: '/tenantAccount/matches', label: 'Recommendation' },
  { path: '/tenantAccount/search', label: 'Search' },
  { path: '/tenantAccount/history', label: 'View Applied History' },
]

export function TenantSideBar({ profile }) {
  return (
    <>
      <div>
        <BaseSideBar
          navBarLinks={tenantLinks}
          profile={profile}
          accountType={TENANT}
        />
      </div>
    </>
  )
}
