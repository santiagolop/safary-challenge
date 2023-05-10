import { Link as MuiLink } from '@mui/material'
import type { LinkProps } from '@mui/material'
import { Link as RemixLink } from '@remix-run/react'
import React from 'react'
import type { FC } from 'react'

const Link: FC<LinkProps> = (props) => {
  return <MuiLink {...props} component={RemixLink} to={props.href ?? '#'} />
}

export default Link
