// modified form : https://mui.com/material-ui/react-popper/
import * as React from 'react'
import Popper from '@mui/material/Popper'
import Typography from '@mui/material/Typography'
import SwipeIcon from '@mui/icons-material/Swipe'
import CancelIcon from '@mui/icons-material/Cancel'
import HelpIcon from '@mui/icons-material/Help'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'

export default function MouseOverPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  return (
    <div>
      <Button aria-describedby={id} onClick={handlePopoverOpen} sx={{ color: 'purple' }}>
        <HelpIcon fontSize="small" />
        How to apply?
      </Button>

      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ p: 3, bgcolor: 'background.paper', boxShadow: 1 }}>
          <Typography variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            Drag the card <SwipeIcon sx={{ ml: 1 }} />
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Or click the cross or check mark button
            <CancelIcon sx={{ color: 'red' }} />
            <CheckCircleIcon sx={{ color: 'green' }} />
          </Typography>
        </Box>
      </Popper>
    </div>
  )
}
