import { Drawer as MuiDrawer, ListItemButton, styled, Box } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

import Logo from '~/components/logo'

import SidebarNav from './sidebar-nav'

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`

const Brand = styled(ListItemButton)<{
  component?: React.ReactNode
  to?: string
}>`
  padding: ${(props) => props.theme.spacing(6)};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.palette.background.paper};
  }
`

const drawerWidth = 258

const Sidebar: React.FC = () => {
  return (
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
      <Box sx={{ position: 'absolute', top: 0 }}>
        <Brand component={NavLink as unknown as React.ReactNode} to="/">
          <Logo />
        </Brand>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '88px',
          bottom: 0,
          overflow: 'auto',
        }}
      >
        <SidebarNav />
      </Box>
    </Drawer>
  )
}

export default Sidebar
