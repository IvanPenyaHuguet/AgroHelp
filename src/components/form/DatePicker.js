import { DatePicker } from 'formik-material-ui-pickers'
import { Field } from 'formik'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    margin: '20px',
  },
})

export default function ({
  label,
  name,
  format = 'DD/MM/YYYY',
  variant = 'outlined',
  ...props
}) {
  const classes = useStyles()
  return (
    <Field
      component={DatePicker}
      label={label}
      name={name}
      format={format}
      disableToolbar
      variant="inline"
      inputVariant={variant}
      className={classes.root}
      {...props}
    />
  )
}
