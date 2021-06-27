import { Field } from 'formik'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import { Select } from 'formik-material-ui'

const menuItems = items => {
  return items.map((item, index) => {
    return (
      <MenuItem key={index} value={item._id}>
        {item.name} {item.variety ? item.variety : ''}
      </MenuItem>
    )
  })
}

export default function SelectInput({ label, name, items, ...props }) {
  return (
    <FormControl>
      <InputLabel htmlFor={`id-${name}`}>{label}</InputLabel>
      <Field
        component={Select}
        name={name}
        variant="outlined"
        inputProps={{
          id: `id-${name}`,
        }}
      >
        {menuItems(items)}
      </Field>
    </FormControl>
  )
}
