import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { useMemo } from 'react'
import { createHead } from 'remix-island'

import createTheme from '~/theme/index'

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

export const Head = createHead(() => (
  <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <Meta />
    <Links />
    <CssBaseline />
  </>
))

export default function App() {
  const cache = createCache({ key: 'css' })
  const theme = useMemo(() => createTheme(), [])

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <Head />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </ThemeProvider>
    </CacheProvider>
  )
}
