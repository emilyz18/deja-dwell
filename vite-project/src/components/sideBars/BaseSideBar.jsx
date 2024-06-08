/* June 1st, 6:00pm, the following structure modified from generated code using Chatgpt 4.0o with prompt "how to create reusable sidebar element that can be used for sidebars with difference type of account in React " */
//Drawer Component adapt from https://mui.com/material-ui/react-drawer/

//June 5st, around 8pm asked using Chatgpt 4.0o"with prompt "How to combine Link from react router to MaterialUI". Changed code in line 54

import './BaseSideBar.css'
import * as React from 'react'
import { Link } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import ListItemAvatar from '@mui/material/ListItemAvatar'

const drawerWidth = 300

export function BaseSideBar({
  accountType,
  navBarLinks,
  profile,
  onSwitchAcc,
}) {
  return (
    <>
      <div className="BaseSidebar">
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              padding: '20px',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />

          <List>
            <ListItem>
              <ListItemAvatar sx={{ margin: '10px' }}>
                <Avatar
                  src={profile.image}
                  sx={{ width: 100, height: 100 }}
                ></Avatar>
              </ListItemAvatar>
              <ListItemText sx={{ margin: '8px' }} primary={profile.name} />
            </ListItem>
            <Divider />

            {navBarLinks.map((linkPair, index) => (
              <ListItem key={index}>
                <ListItemButton component={Link} to={linkPair.path}>
                  <ListItemText primary={linkPair.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <Button onClick={onSwitchAcc}>
            Switch to {accountType === 'landlord' ? 'Tenant' : 'Landlord'}{' '}
            Account
          </Button>

          <Divider />
        </Drawer>
      </div>
    </>
  )
}
