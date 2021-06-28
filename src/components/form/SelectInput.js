import { Field } from 'formik'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import { Select } from 'formik-material-ui'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    margin: '20px',
    width: '200px',
    minWidth: '200px',
  },
  label: {
    transform: 'translate(14px, 20px) scale(1)',
  },
})

const menuItems = items => {
  return items.map((item, index) => {
    return (
      <MenuItem key={index} value={item._id ? item._id : item.value}>
        {item.name} {item.variety ? item.variety : ''}
      </MenuItem>
    )
  })
}

export default function SelectInput({ label, name, items, ...props }) {
  const classes = useStyles()
  return (
    <FormControl className={classes.root}>
      <InputLabel htmlFor={`id-${name}`} variant="outlined">
        {label}
      </InputLabel>
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
