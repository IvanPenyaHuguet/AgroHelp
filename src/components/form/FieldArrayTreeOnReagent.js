import { FieldArray } from 'formik'

import { TextField, SelectInput } from '../Exports'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'

import { useRxData } from 'rxdb-hooks'

export default function FieldArrayInputs({
  name,
  label,
  sublabel = '',
  values,
}) {
  const { result, isFetching } = useRxData(
    'trees',
    collection => collection.find(),
    {
      json: true,
    }
  )
  return (
    <FieldArray name={name}>
      {({ remove, push }) => (
        <>
          {values.length > 0 &&
            values.map((value, index) => (
              <Card variant="outlined" key={index}>
                <CardHeader title={label} subheader={sublabel} />
                <CardContent>
                  <Typography paragraph component="div">
                    <SelectInput
                      name={`${name}.${index}.tree`}
                      label="Cultivo"
                      items={isFetching ? [] : result}
                    />
                    <TextField
                      name={`${name}.${index}.minDose`}
                      label="Dosis Min."
                      type="number"
                    />
                    <TextField
                      name={`${name}.${index}.maxDose`}
                      label="Dosis Max."
                      type="number"
                    />
                    <TextField
                      name={`${name}.${index}.disease`}
                      label="Enfermedad"
                    />
                    <TextField
                      name={`${name}.${index}.term`}
                      label="Plazo espera"
                    />
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    aria-label="Menos"
                    color="secondary"
                    onClick={() => remove(index)}
                  >
                    <RemoveCircleIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    aria-label="Mas"
                    color="secondary"
                    onClick={() =>
                      push({
                        tree: '',
                        minDose: 0,
                        maxDose: 0,
                        disease: '',
                        term: 0,
                      })
                    }
                  >
                    <AddCircleIcon fontSize="large" />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
        </>
      )}
    </FieldArray>
  )
}
