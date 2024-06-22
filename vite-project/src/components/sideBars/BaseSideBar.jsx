import './BaseSideBar.css'
import * as React from 'react'
import { Link } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

export function BaseSideBar({
  accountType,
  navBarLinks,
  profile,
  onSwitchAcc,
}) {
  const handleSwitchAcc = () => {
    if (accountType === 'landlord' && !profile.TenantID) {
      alert("You don't have a tenant account")
    } else if (accountType === 'tenant' && !profile.LandlordID) {
      alert("You don't have a landlord account")
    } else {
      onSwitchAcc()
    }
  }

  return (
    <div className="sidebar-container">
      <Drawer className="sidebar-drawer" variant="permanent" anchor="left">
        <div className="sidebar-content">
          <div className="sidebar-avatar">
            <Avatar src={profile.ProfileImg} className="MuiAvatar-root" />
            <ListItemText
              style={{ margin: '5px', textAlign: 'center' }}
              primary={profile.UserName}
            />
          </div>
          <Divider />
          <List>
            {navBarLinks.map((linkPair, index) => (
              <ListItem key={index} className="sidebar-list-item">
                <ListItemButton component={Link} to={linkPair.path}>
                  <ListItemText primary={linkPair.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
        <div className="sidebar-bottom-content">
          <Button className="sidebar-button" onClick={handleSwitchAcc}>
            <span>
              Switch to {accountType === 'landlord' ? 'Tenant' : 'Landlord'}{' '}
              Account
            </span>
          </Button>
        </div>
      </Drawer>
    </div>
  )
}
