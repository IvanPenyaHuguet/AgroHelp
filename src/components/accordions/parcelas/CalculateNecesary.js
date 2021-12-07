import { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { Container, TextField, Button, Form } from '../../Exports'
import TableCalculated from './TableCalculated'
import SelectReagent from './SelectReagent'
import { useRxCollection } from 'rxdb-hooks'
import Grid from '@mui/material/Grid';
import { AlertContext } from '../../../context/AlertContext'

const YupSchema = Yup.object().shape({
  literWaterSpec: Yup.number('Debe de ser un numero')
    .positive('Debe de ser un numero positivo')
    .required('Necesario'),
  reagent: Yup.object().nullable().required('Necesario'),
})

export default function CalculateNecessary({ rowSelected }) {
  const collection = useRxCollection('historics')
  const { setAlert } = useContext(AlertContext)
  return (
    <Container>
      <Formik
        initialValues={{
          literWaterSpec: 1000,
          reagent: '',
          fields: [],
        }}
        validationSchema={YupSchema}
        onSubmit={async (values, actions) => {
          try {
            console.log(values)
            await values.fields.forEach(async field => {
              await collection.insert({
                nameField: field.name,
                refCastField: field.refCast,
                areaField: field.area,
                nameReagent: values.reagent.name,
                nRegReagent: values.reagent.nReg,
                maxDoseReagent: field.maxReagentDose,
                unitReagent: values.reagent.unit,
                nameTree: field.cultivo,
                dose: Number(
                  (
                    ((field.maxNecDose + field.minNecDose) /
                      2 /
                      field.necWater) *
                    100
                  ).toFixed(3)
                ),
                quantityUsedReagent: Number(
                  ((field.maxNecDose + field.minNecDose) / 2).toFixed(3)
                ),
                literWater: values.literWaterSpec,
                date: dayjs().valueOf(),
                createdAt: dayjs().valueOf(),
                updatedAt: dayjs().valueOf(),
              })
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
        {({ isSubmitting, errors, touched, values }) => (
          <Form>
            <Grid
              container
              spacing={10}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs>
                <SelectReagent
                  errors={errors}
                  touched={touched}
                  rowSelected={rowSelected}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  name="literWaterSpec"
                  label="Litros cuba agua"
                  type="number"
                />
              </Grid>
              <Grid item xs>
                <Button disabled={isSubmitting} type="submit">
                  Guardar en historico
                </Button>
              </Grid>
            </Grid>
            <TableCalculated values={values} />
          </Form>
        )}
      </Formik>
    </Container>
  )
}
