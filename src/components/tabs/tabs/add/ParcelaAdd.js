import { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { useRxCollection, useRxData } from 'rxdb-hooks'

import { Paper, TextField, Button, Form, SelectInput } from '../../../Exports'
import { AlertContext } from '../../../../context/AlertContext'
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
  refCast: Yup.string().length(20, 'Son 20 caracteres').required('Necesario'),
  area: Yup.number('Debe de ser un numero')
    .positive('Debe de ser un numero positivo')
    .required('Necesario'),
  plantedArea: Yup.number('Debe de ser un numero')
    .positive('Debe de ser un numero positivo')
    .lessThan(Yup.ref('area'), 'Debe ser menor al área')
    .required('Necesario'),
  quantity: Yup.number('Debe de ser un numero')
    .integer('Debe de ser un numero entero')
    .positive('Debe de ser un numero positivo')
    .required('Necesario'),
})

export default function ParcelaAdd() {
  const classes = useStyles()
  const collection = useRxCollection('fields')
  const { setAlert } = useContext(AlertContext)

  const { result, isFetching } = useRxData(
    'trees',
    collection => collection.find(),
    {
      json: true,
    }
  )

  return (
    <Paper className={classes.root}>
      <Formik
        initialValues={{
          name: '',
          refCast: '',
          area: '',
          quantity: 0,
          province: '',
          town: '',
          polygon: '',
          parcel: '',
          plantedArea: '',
          tree: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          collection
            .insert({ ...values, createdAt: dayjs().valueOf() })
            .then(() => {
              setAlert({
                type: 'success',
                message: 'Parcela añadida con éxito',
              })
            })
            .catch(err => {
              console.error(err)
              setAlert({
                type: 'error',
                message:
                  'Error no controlado, envia un email a ivanpenyahuguet@gmail.com',
              })
            })
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextField name="refCast" label="Referencia catastral" />
            <TextField name="name" label="Nombre" />
            <TextField name="province" label="Cod. Provincia" type="number" />
            <TextField name="town" label="Cod. Municipio" type="number" />
            <TextField name="polygon" label="Cod. Poligono" type="number" />
            <TextField name="parcel" label="Cod. Parcela" type="number" />
            <SelectInput
              name="tree"
              label="Cultivo"
              items={isFetching ? [] : result}
            />
            <TextField name="quantity" label="Cantidad" type="number" />
            <TextField name="area" label="Área" type="number" />
            <TextField
              name="plantedArea"
              label="Área cultivada"
              type="number"
            />

            <Button disabled={isSubmitting} type="submit">
              Nuevo
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  )
}
