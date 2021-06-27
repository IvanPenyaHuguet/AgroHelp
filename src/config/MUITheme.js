import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { esES } from '@material-ui/data-grid'
import { esES as coreesES } from '@material-ui/core/locale'

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#00e676',
      },
    },
    overrides: {},
  },
  esES,
  coreesES
)

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
