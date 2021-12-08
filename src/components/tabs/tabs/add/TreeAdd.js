import { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { useRxCollection } from 'rxdb-hooks'

import { Paper, TextField, Button, Form } from '../../../Exports'

import { AlertContext } from '../../../../context/AlertContext'

const sxClasses = {
  root: {
    height: '100%',
  },
  formroot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Muy corto!')
    .max(50, 'Muy largo!')
    .required('Necesario'),
})

export default function TreeAdd() {

  const collection = useRxCollection('trees')
  const { setAlert } = useContext(AlertContext)

  return (
    <Paper sx={sxClasses.root}>
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
              id: uuidv4(),
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
          <Form sx={sxClasses.form}>
            <TextField name="name" label="Nombre Com." />
            <TextField name="variety" label="Variedad" />

            <Button disabled={isSubmitting} type="submit">
              Nuevo
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
