import Popover from '@material-ui/core/Popover'

export default function PopOver({ children, anchorEl, setAnchorEl }) {
  const open = Boolean(anchorEl)

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  return (
    <Popover
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
    >
      {children}
    </Popover>
  )
}
