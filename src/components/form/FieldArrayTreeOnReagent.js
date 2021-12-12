import { FieldArray } from 'formik'

import { TextField, SelectFieldReagent } from '../Exports'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import { useRxData } from 'rxdb-hooks'

const sxClasses = {
  card: {
    margin: '25px',
    width: '100%',
  },
  cardcontent: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: '160px',
  },
  small: {
    margin: '20px',
    width: '110px',
  },
};

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
              <Card variant="outlined" key={index} sx={sxClasses.card}>
                <CardHeader title={label} subheader={sublabel} />
                <CardContent sx={sxClasses.cardcontent}>
                  <SelectFieldReagent
                    name={`${name}.${index}.tree`}
                    label="Cultivo"
                    items={isFetching ? [] : result}
                    index={index}
                  />
                  <TextField
                    name={`${name}.${index}.minDose`}
                    label="Dosis Min. (%)"
                    type="number"
                    sx={sxClasses.small}
                  />
                  <TextField
                    name={`${name}.${index}.maxDose`}
                    label="Dosis Max. (%)"
                    type="number"
                    sx={sxClasses.small}
                  />
                  <TextField
                    name={`${name}.${index}.disease`}
                    label="Enfermedad"
                  />
                  <TextField
                    name={`${name}.${index}.term`}
                    label="Plazo espera"
                    sx={sxClasses.small}
                  />
                  <IconButton
                    aria-label="Menos"
                    color="secondary"
                    size="large"
                    disabled={values.length > 0}
                    onClick={() => remove(index)}
                  >
                    <RemoveCircleIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    aria-label="Mas"
                    size="large"
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
                </CardContent>
              </Card>
            ))}
        </>
      )}
    </FieldArray>
  );
}
