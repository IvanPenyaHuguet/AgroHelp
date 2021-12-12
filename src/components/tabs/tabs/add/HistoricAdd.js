import { useContext, useEffect } from 'react'
import { Formik, useFormikContext } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { useRxCollection, useRxData } from 'rxdb-hooks'
import ChangeFieldDose from '../../../form/ChangeFieldDose'

import {
  Paper,
  TextField,
  NewButton,
  Form,
  DatePicker,
  AutocompleteField,
} from '../../../Exports'
import { AlertContext } from '../../../../context/AlertContext'

const sxClasses = {
  root: {
    height: '100%',
    padding: '24px'
  },
  form: {
    width: '90%',
    minWidth: '1100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: '0 auto',
  }
};

const SignupSchema = Yup.object().shape({
  field: Yup.object().nullable().required('Necesario'),
  reagent: Yup.object().nullable().required('Necesario'),
  literWater: Yup.number('Debe de ser un numero')
    .positive('Debe de ser un numero positivo')
    .required('Necesario'),
  quantityUsedReagent: Yup.number('Debe de ser un numero')
    .positive('Debe de ser un numero positivo')
    .required('Necesario'),
  dose: Yup.number('Debe de ser un numero')
    .positive('Debe de ser un numero positivo')
    .required('Necesario'),
})

export default function HistoricAdd() {

  const collection = useRxCollection('historics')
  const collectionTree = useRxCollection('trees')
  const { setAlert } = useContext(AlertContext)

  return (
    <Paper sx={sxClasses.root}>
      <Formik
        initialValues={{
          field: '',
          reagent: '',
          dose: '',
          quantityUsedReagent: 0,
          literWater: 1000,
          date: dayjs(),
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          try {
            const tree = await collectionTree
              .findOne({
                selector: {
                  id: values.field.tree,
                },
              })
              .exec()
            await collection.insert({
              nameField: values.field.name,
              refCastField: values.field.refCast,
              areaField: values.field.plantedArea,
              nameReagent: values.reagent.name,
              nRegReagent: values.reagent.nReg,
              maxDoseReagent: values.reagent.trees.find(
                val => val.tree === tree.name
              ),
              unitReagent: values.reagent.unit,
              nameTree: tree.name,
              dose: values.dose,
              quantityUsedReagent: values.quantityUsedReagent,
              literWater: values.literWater,
              date: dayjs(values.date, 'DD/MM/YYYY').valueOf(),
              id: uuidv4(),
              createdAt: dayjs().valueOf(),
              updatedAt: dayjs().valueOf(),
            })
            setAlert({
              type: 'success',
              message: 'Guardado con éxito',
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
        {({ isSubmitting, errors, touched }) => (
          <Form sx={sxClasses.form}>
            <AutocompleteField
              name="field"
              label="Parcela"
              collection="fields"
              errors={errors}
              touched={touched}
            />
            <AutocompleteField
              name="reagent"
              label="Reactivo"
              collection="reagents"
              errors={errors}
              touched={touched}
            />
            <TextField name="literWater" label="Litros agua" type="number" />
            <TextField
              name="quantityUsedReagent"
              label="Reactivo usado (L o Kg)"
              type="number"
            />
            <ChangeFieldDose />
            <DatePicker name="date" label="Fecha" />
            <NewButton isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
