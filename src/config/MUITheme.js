import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { esES } from '@mui/x-data-grid'
import { esES as coreesES } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#ffa726',
      },
    },
    overrides: {},
  },
  esES,
  coreesES
);

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
