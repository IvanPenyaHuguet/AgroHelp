import { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { useRxCollection } from 'rxdb-hooks'
import Typography from '@material-ui/core/Typography'

import {
  Paper,
  TextField,
  TextFieldWithSelect,
  Button,
  Form,
  FieldArrayTreeOnReagent,
} from '../../../Exports'

import { units } from '../../../../config/Units'

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
  product: Yup.string().min(2, 'Muy corto!').max(50, 'Muy largo!').optional(),
  quantityTotal: Yup.number('Debe de ser un numero')
    .positive('Debe de ser un numero positivo')
    .required('Necesario'),
  nReg: Yup.number('Debe de ser un numero')
    .positive('Debe de ser un numero positivo')
    .required('Necesario'),
  price: Yup.number('Debe de ser un numero')
    .positive('Debe de ser un numero positivo')
    .optional(),
  supplier: Yup.string().min(2, 'Muy corto!').max(50, 'Muy largo!').optional(),
  observations: Yup.string().max(300, 'Muy largo!').optional(),
  trees: Yup.array().of(
    Yup.object()
      .shape({
        tree: Yup.string()
          .min(2, 'Muy corto!')
          .max(50, 'Muy largo!')
          .required('Necesario'),
        minDose: Yup.number('Debe de ser un numero')
          .positive('Debe de ser un numero positivo')
          .required('Necesario'),
        maxDose: Yup.number('Debe de ser un numero')
          .positive('Debe de ser un numero positivo')
          .moreThan(Yup.ref('minDose'), 'Debe ser mayor a la dosis minima')
          .required('Necesario'),
        disease: Yup.string()
          .min(2, 'Muy corto!')
          .max(50, 'Muy largo!')
          .required('Necesario'),
        term: Yup.number('Debe de ser un numero')
          .integer('Debe de ser un numero entero')
          .min(0, 'Debe de ser un numero positivo')
          .required('Necesario'),
      })
      .optional()
  ),
})

export default function TreeAdd() {
  const classes = useStyles()
  const collection = useRxCollection('reagents')
  const { setAlert } = useContext(AlertContext)

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Se deben de rellenar con los datos del fabrecante, y se recomienda
        utilizar los datos de:
        <a
          target="_blank"
          href="https://www.infoagro.com/agrovademecum/index.asp"
        >
          AGROVADEMÉCUM
        </a>
      </Typography>
      <Formik
        initialValues={{
          name: '',
          product: '',
          quantityTotal: 0,
          unit: 'Kg',
          price: 0,
          supplier: '',
          observations: '',
          nReg: '',
          trees: [
            {
              tree: '',
              minDose: 0,
              maxDose: 0,
              disease: '',
              term: 0,
            },
          ],
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          await collection
            .insert({
              ...values,
              createdAt: dayjs().valueOf(),
              updatedAt: dayjs().valueOf(),
              quantityUsed: 0,
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
            message: 'Producto añadido con éxito',
          })
          actions.resetForm()
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <TextField name="nReg" label="Nº Registro" type="number" />
            <TextField name="name" label="Nombre" />
            <TextField name="product" label="Producto" />
            <TextField name="supplier" label="Proveedor" />
            <TextFieldWithSelect
              name="quantityTotal"
              label="Cantidad"
              labelSelect="Unidad"
              nameSelect="unit"
              valueAvatar={values.unit}
              items={units}
            />
            <TextField name="price" label="Precio" type="number" />
            <TextField name="observations" label="Observaciones" rows="3" />
            <FieldArrayTreeOnReagent
              name="trees"
              label="Limitaciones cultivo"
              sublabel="Necesidades regulativas de los cultivos"
              values={values.trees}
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
