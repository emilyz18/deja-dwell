// credit to : https://mui.com/material-ui/react-popover/#mouse-over-interaction 
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import SwipeIcon from '@mui/icons-material/Swipe';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function MouseOverPopover() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{ color: 'purple' }}
            >
                How to apply?
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Box sx={{ p: 1 }}>
                    <Typography variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                        Drag the card <SwipeIcon sx={{ ml: 1 }} />
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Or click the check or cross button
                        <CancelIcon sx={{ color: 'red' }} />
                        <CheckCircleIcon sx={{ color: 'green' }} />
                    </Typography>
                </Box>

            </Popover>
        </div>
    );
}
