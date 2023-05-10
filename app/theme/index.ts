import '@mui/lab/themeAugmentation'
import { createTheme as createMuiTheme } from '@mui/material/styles'

import breakpoints from './breakpoints'
import components from './components'
import shadows from './shadows'
import typography from './typography'

const createTheme = () => {
  return createMuiTheme({
    spacing: 4,
    breakpoints: breakpoints,
    // @ts-ignore
    components: components,
    typography: typography,
    shadows: shadows,
    palette: {
      primary: {
        main: '#0D5C63',
      },
      secondary: {
        main: '#050505',
      },
      info: {
        main: '#1565C0',
      },
      success: {
        main: '#12B76A',
      },
      warning: {
        main: '#F79009',
      },
      error: {
        main: '#F04438',
      },
      text: {
        primary: '#171618',
        secondary: '#475467',
      },
      background: {
        default: '#f8f8f8',
        paper: '#ffffff',
      },
    },
  })
}

export default createTheme
