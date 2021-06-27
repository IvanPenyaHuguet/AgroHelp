import { TextField } from 'formik-material-ui'
import { Field } from 'formik'

export default function ({ label, name }) {
  return (
    <Field component={TextField} label={label} name={name} variant="outlined" />
  )
}
