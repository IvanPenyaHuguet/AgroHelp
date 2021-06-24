import { useState, createContext } from 'react'
import Alert from './Alert'

export const AlertContext = createContext()

export default function AlertContextProvider({ children }) {
  const [alert, setAlert] = useState(false)

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {alert && (
        <Alert type={alert.type} message={alert.message} setOpen={setAlert} />
      )}
      {children}
    </AlertContext.Provider>
  )
}
