import { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { useRxCollection, useRxData } from 'rxdb-hooks'

import validateRefCat from '../../../../services/validators/ValidateRefCat'
import {
  Paper,
  TextField,
  Button,
  Form,
  SelectInput,
  RefCatInput,
} from '../../../Exports'
import { AlertContext } from '../../../../context/AlertContext'

const sxClasses = {
  root: {
    height: '100%',
  },
  form: {
    width: '90%',
    minWidth: '1100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: '0 auto',
  },
};

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Muy corto!')
    .max(50, 'Muy largo!')
    .required('Necesario'),
  refCast: Yup.string()
    .length(20, 'Son 20 caracteres')
    .test('validate-refcat', 'Las letras no son válidas', value => {
      return validateRefCat(value)
    })
    .required('Necesario'),
  area: Yup.number('Debe de ser un numero')
    .positive('Debe de ser un numero positivo')
    .required('Necesario'),
  plantedArea: Yup.number('Debe de ser un numero')
    .positive('Debe de ser un numero positivo')
    .max(Yup.ref('area'), 'Debe ser menor al área')
    .required('Necesario'),
  quantity: Yup.number('Debe de ser un numero')
    .integer('Debe de ser un numero entero')
    .min(0, 'Debe de ser un numero positivo')
    .required('Necesario'),
})

export default function ParcelaAdd() {

  const collection = useRxCollection('fields')
  const collectionTree = useRxCollection('trees')
  const { setAlert } = useContext(AlertContext)

  const { result, isFetching } = useRxData(
    'trees',
    collection => collection.find(),
    {
      json: true,
    }
  )

  return (
    <Paper sx={sxClasses.root}>
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
        onSubmit={async (values, actions) => {
          try {
            const tree = await collectionTree
              .findOne({
                selector: {
                  _id: values.tree,
                },
              })
              .exec()
            await collection.insert({
              ...values,
              area: parseFloat(values.area.toFixed(5)),
              plantedArea: parseFloat(values.plantedArea.toFixed(5)),
              tree: {
                name: tree.name,
                variety: tree.variety,
                id: tree._id,
              },
              createdAt: dayjs().valueOf(),
              updatedAt: dayjs().valueOf(),
            })
            setAlert({
              type: 'success',
              message: 'Parcela añadida con éxito',
            })
            actions.resetForm()
          } catch (err) {
            console.error(err)
            setAlert({
              type: 'error',
              message:
                'Error no controlado, envia un email a ivanpenyahuguet@gmail.com',
            })
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form sx={sxClasses.form}>
            <RefCatInput name="refCast" label="Referencia catastral" />
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
            <TextField
              name="quantity"
              label="Cantidad cultivado"
              type="number"
            />
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
  );
}
