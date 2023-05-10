import {
  List as MUIList,
  styled,
  ListItem,
  ListItemButton as MUIListItemButton,
  ListItemIcon as MUIListItemIcon,
  ListItemText,
  Grid as MUIGrid,
} from '@mui/material'
import type { ListItemButtonProps as MuiListItemButtonProps } from '@mui/material'
import React from 'react'
import { PieChart, TrendingUp } from 'react-feather'

interface ListItemButtonProps extends MuiListItemButtonProps {
  component?: string
  href?: string
}

const Root = styled(MUIGrid)`
  width: 100%;
  height: 100%;
`

const List = styled(MUIList)`
  width: 100%;
`

const ListItemButton = styled(MUIListItemButton)<ListItemButtonProps>`
  border-radius: ${(props) => props.theme.spacing(2)};
  margin: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(4)};
`

const ListItemIcon = styled(MUIListItemIcon)`
  padding-right: ${(props) => props.theme.spacing(3)};
  min-width: 0;
`

const items = [
  {
    title: 'Simple Lines Chart',
    href: '/simple-lines',
    icon: <TrendingUp />,
  },
  {
    title: 'Another Simple Lines Chart',
    href: '/another-simple-lines',
    icon: <TrendingUp />,
  },
  {
    title: 'My cool pie chart',
    href: '/simple-pie',
    icon: <PieChart />,
  },
]

const SidebarNav = () => {
  return (
    <Root container>
      <List disablePadding>
        {items.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton component="a" href={item.href}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Root>
  )
}

export default SidebarNav
