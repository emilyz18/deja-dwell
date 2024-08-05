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

export function BaseSideBar({ navBarLinks, profile, accountType }) {
  const onLogout = () => {
    location.reload()
  }

  return (
    <div className="sidebar-container">
      <Drawer className="sidebar-drawer" variant="permanent" anchor="left">
        <div className="sidebar-content">
          <ListItemText
            disableTypography
            sx={{
              fontFamily: 'Mulish, sans-serif',
              fontSize: '1.2em',
              fontWeight: 200,
              textAlign: 'center',
            }}
            primary={`${accountType.toUpperCase()} DASHBOARD`}
          />
          <div className="sidebar-avatar">
            <Avatar src={profile.ProfileImg} className="MuiAvatar-root" />
            <ListItemText
              disableTypography
              sx={{
                fontFamily: 'Mulish, sans-serif',
                fontSize: '1.1em',
                margin: '5px',
                textAlign: 'center',
              }}
              primary={profile.UserName}
            />
          </div>
          <Divider />
          <List>
            {navBarLinks.map((linkPair, index) => (
              <ListItem key={index} className="sidebar-list-item">
                <ListItemButton component={Link} to={linkPair.path}>
                  <ListItemText
                    disableTypography
                    sx={{ fontFamily: 'Mulish, sans-serif', fontSize: '1.1em' }}
                    primary={linkPair.label}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
        <div className="sidebar-bottom-content">
          <Button className="sidebar-button" onClick={onLogout}>
            <span>Logout</span>
          </Button>
        </div>
      </Drawer>
    </div>
  )
}
