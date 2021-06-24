import Router from './Router'

import ThemeProvider from './config/MUITheme'
import { AlertContext } from './components/Exports'
import { Greetings } from './components/Greetings'

export function App() {
  return (
    <ThemeProvider>
      <AlertContext>
        <Router />
      </AlertContext>
    </ThemeProvider>
  )
}
