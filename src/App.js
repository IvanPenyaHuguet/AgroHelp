import React, { useState, useEffect } from 'react'
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { StyledEngineProvider } from '@mui/material/styles';
require('dayjs/locale/es')

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
    if (!db) {
      initDB()
    }    
  }, [])

  return (
    <React.StrictMode>
      <Provider db={db} idAttribute="id">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider>
              <AlertContext>
                <Router />
              </AlertContext>
            </ThemeProvider>
          </StyledEngineProvider>
        </LocalizationProvider>
      </Provider>
    </React.StrictMode>
  )
}
