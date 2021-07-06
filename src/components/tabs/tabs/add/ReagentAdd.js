import { useContext, useState } from 'react'
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
  Popover,
  CalculateUnits,
  Container,
} from '../../../Exports'

import { units } from '../../../../config/Units'

import { AlertContext } from '../../../../context/AlertContext'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    padding: 0,
  },
  underline: {
    textDecoration: 'underline',
    '&:hover': {
      color: '#B481FF',
      backgroundColor: '#FFEAAC',
      cursor: 'pointer',
    },
  },
  formcontainer: {
    height: 'calc(100% - 60px)',
    width: '100%',
  },
  form: {
    margin: '5px 25px',
    width: '100%',
  },
  small: {
    margin: '20px',
    width: '120px',
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
          .min(Yup.ref('minDose'), 'Debe ser mayor a la dosis minima')
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
  const [anchorElCalc, setAnchorElCalc] = useState(null)

  const handleCalcClick = event => {
    setAnchorElCalc(event.currentTarget)
  }

  return (
    <Container className={classes.root}>
      <Popover anchorEl={anchorElCalc} setAnchorEl={setAnchorElCalc}>
        <CalculateUnits />
      </Popover>
      <Typography variant="h6" gutterBottom>
        Se deben de rellenar con los datos del fabricante, y se recomienda
        utilizar los datos de:
        <a
          target="_blank"
          href="https://www.infoagro.com/agrovademecum/index.asp"
        >
          AGROVADEMÉCUM
        </a>
      </Typography>
      <Typography
        variant="subtitle1"
        className={classes.underline}
        gutterBottom
        onClick={handleCalcClick}
      >
        Puedes pulsar aqui para recibir ayuda en la conversion de unidades, para
        expresar en % las dosis.
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
          products: [],
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
          <Form className={classes.formcontainer}>
            <Paper className={classes.form}>
              <TextField
                name="nReg"
                label="Nº Registro"
                type="number"
                className={classes.small}
              />
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
              <TextField
                name="price"
                label="Precio"
                type="number"
                className={classes.small}
              />
              <TextField name="observations" label="Observaciones" rows="3" />
            </Paper>
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
    </Container>
  )
}
