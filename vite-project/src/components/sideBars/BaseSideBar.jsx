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
  return (
    <>
      <div className="sidebar-container">
        <Drawer className="sidebar-drawer" variant="permanent" anchor="left">
          <div className="sidebar-avatar">
            <Avatar src={profile.image} className="MuiAvatar-root" />
            <ListItemText
              style={{ margin: '5px', textAlign: 'center' }}
              primary={profile.name}
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
          <Button className="sidebar-button" onClick={onSwitchAcc}>
            <span>
              Switch to {accountType === 'landlord' ? 'Tenant' : 'Landlord'}{' '}
              Account
            </span>
          </Button>
        </Drawer>
      </div>
    </>
  )
}
