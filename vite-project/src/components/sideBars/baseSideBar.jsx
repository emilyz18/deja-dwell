// import React from 'react';
import "./baseSideBar.css";
/* June 1st, 6:00pm, the following structure modified from genreated code usign Chagpt 4.0o with prompt "how to create reusable side bar element that can be used for side bars with dfference type of account in React " */
import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ListItemAvatar from '@mui/material/ListItemAvatar';

//https://mui.com/material-ui/react-drawer/

const drawerWidth = 240;
export function BaseSidebar({ navBarLinks, profile }) {

    return (
        <>  
            
            <div className='BaseSidebar'>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <Divider />

                    <List> 
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={profile.image} sx={{ width: 100, height: 100 }} ></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={profile.name} />
                        </ListItem>
                        <Divider />
                        
                        {navBarLinks.map((linkPair, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton component="a" href="{linkPair.path}">
                                    <ListItemText primary={linkPair.label} />
                                </ListItemButton>
                            </ListItem>
                            
                        ))}
                    </List>

                    <Divider />
                    <Button onClick={() => {alert('clicked');}}>
                        Swith to Tenant Account
                    </Button>

                </Drawer>

                {/* <p>{profile.name}</p>
                <img src={profile.image} />
                <ul>
                    {navBarLinks.map((linkPair, index) => (
                        <li key={index}>
                            <a href={linkPair.path}>{linkPair.label}</a>
                        </li>
                    ))}
                </ul>
                <button>
                    Switch Dashboard
                </button> */}
        </div >

        </>
    );

}



