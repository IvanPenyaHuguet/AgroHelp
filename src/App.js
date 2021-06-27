import { useState, useEffect } from 'react'
import Router from './Router'

import { Provider } from 'rxdb-hooks'
import ThemeProvider from './config/MUITheme'
import { AlertContext } from './components/Exports'

import { getDatabase } from './services/database/Database'

export function App() {
  const [db, setDb] = useState()
  useEffect(() => {
    const initDB = async () => {
      const _db = await getDatabase()
      setDb(_db)
    }
    initDB()
  }, [])

  return (
    <Provider db={db}>
      <ThemeProvider>
        <AlertContext>
          <Router />
        </AlertContext>
      </ThemeProvider>
    </Provider>
  )
}
