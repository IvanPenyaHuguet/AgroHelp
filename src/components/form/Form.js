import { Form } from 'formik'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
})

export default function ({ children }) {
  const classes = useStyles()
  return <Form className={classes.root}>{children}</Form>
}
