import { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import TextField from './TextField'
import { Popover, SelectInput } from '../Exports'


const sxClasses = {
  root: {
    margin: '20px',
    width: '200px',
    height: '80px',
  },
};

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


  const [anchorEl, setAnchorEl] = useState(null)

  const handleClickSelect = e => {
    setAnchorEl(e.currentTarget)
  }

  return (
    <div>
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
        sx={sxClasses.root}
      />
      <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        <SelectInput label={labelSelect} name={nameSelect} items={items} />
      </Popover>
    </div>
  );
}
