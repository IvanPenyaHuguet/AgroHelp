import { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { useRxCollection } from 'rxdb-hooks'

import { Paper, TextField, Button, Form } from '../../../Exports'

import { AlertContext } from '../../../../context/AlertContext'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  const { setAlert } = useContext(AlertContext)

  return (
    <Paper className={classes.root}>
      <Formik
        initialValues={{
          name: '',
          variety: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          await collection
            .insert({
              ...values,
              createdAt: dayjs().valueOf(),
              updatedAt: dayjs().valueOf(),
            })
            .catch(err => {
              console.error(err)
              setAlert({
                type: 'error',
                message:
                  'Error no controlado, envia un email a ivanpenyahuguet@gmail.com',
              })
            })
          setAlert({
            type: 'success',
            message: 'Cultivo añadido con éxito',
          })
          actions.resetForm()
        }}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <TextField name="name" label="Nombre Com." />
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
