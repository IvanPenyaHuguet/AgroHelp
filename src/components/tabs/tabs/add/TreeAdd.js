import { Formik } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { useRxCollection } from 'rxdb-hooks'

import { Paper, TextField, Button, Form } from '../../../Exports'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
})

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Muy corto!')
    .max(50, 'Muy largo!')
    .required('Necesario'),
})

export default function TreeAdd() {
  const classes = useStyles()
  const collection = useRxCollection('trees')
  return (
    <Paper className={classes.root}>
      <Formik
        initialValues={{
          name: '',
          variety: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async values => {
          await collection.insert({ ...values, createdAt: dayjs().valueOf() })
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextField name="name" label="Nombre" />
            <TextField name="variety" label="Variedad" />
            <Button disabled={isSubmitting} type="submit">
              Nuevo
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  )
}
