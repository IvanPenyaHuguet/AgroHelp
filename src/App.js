import Router from './Router'

import ThemeProvider from './config/MUITheme'
import { AlertContext } from './components/Exports'

export function App() {
  return (
    <ThemeProvider>
      <AlertContext>
        <Router />
      </AlertContext>
    </ThemeProvider>
  )
}
