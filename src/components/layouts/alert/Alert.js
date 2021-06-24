import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

export default function ({
  setOpen,
  type = 'error',
  message,
  vertical = 'bottom',
  horizontal = 'center',
}) {
  const open = message ? true : false
  const handleClose = e => {
    setOpen(false)
  }
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert variant="filled" severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}
