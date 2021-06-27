import { TextField } from 'formik-material-ui'
import { Field } from 'formik'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    margin: '20px',
  },
})

export default function ({ label, name, ...props }) {
  const classes = useStyles()
  return (
    <Field
      component={TextField}
      label={label}
      name={name}
      variant="outlined"
      className={classes.root}
      {...props}
    />
  )
}
