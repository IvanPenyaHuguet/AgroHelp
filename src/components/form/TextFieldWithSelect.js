import { useState } from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'

import TextField from './TextField'
import { Popover, SelectInput } from '../Exports'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    margin: '20px',
  },
})

export default function TextFieldWithSelect({
  label,
  labelSelect,
  name,
  nameSelect,
  items,
  setFormValue,
  valueAvatar,
  ...props
}) {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClickSelect = e => {
    setAnchorEl(e.currentTarget)
  }

  return (
    <>
      <TextField
        name={name}
        label={label}
        type="number"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="Cambio" onClick={handleClickSelect}>
                <Avatar>{valueAvatar}</Avatar>
              </IconButton>
            </InputAdornment>
          ),
        }}
        className={classes.root}
      />
      <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        <SelectInput label={labelSelect} name={nameSelect} items={items} />
      </Popover>
    </>
  )
}
