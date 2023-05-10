import { Box, Paper as MuiPaper, styled } from '@mui/material'
import { spacing } from '@mui/system'
import { Outlet } from '@remix-run/react'
import { redirect } from '@remix-run/server-runtime'
import type { LoaderArgs } from '@remix-run/server-runtime'

import Sidebar from '~/components/sidebar/sidebar'
import { safeRedirect } from '~/utils/safe-redirect'

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url)
  const search = new URLSearchParams(url.search)

  const returnTo = search.get('return_to')
  if (returnTo) return redirect(safeRedirect(returnTo))

  return null
}

const Root = styled(Box)`
  display: flex;
  min-height: 100vh;
`

const AppContent = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`

const Paper = styled(MuiPaper)(spacing)

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};
  padding: ${(props) => props.theme.spacing(8)};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`

export default function HomeLayout() {
  return (
    <Root>
      <Sidebar />
      <AppContent>
        <MainContent>
          <Outlet />
        </MainContent>
      </AppContent>
    </Root>
  )
}
