import { FieldArray } from 'formik'

import { TextField, SelectFieldReagent } from '../Exports'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'

import { useRxData } from 'rxdb-hooks'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
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
})

export default function FieldArrayInputs({
  name,
  label,
  sublabel = '',
  values,
}) {
  const classes = useStyles()
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
              <Card variant="outlined" key={index} className={classes.card}>
                <CardHeader title={label} subheader={sublabel} />
                <CardContent className={classes.cardcontent}>
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
                    className={classes.small}
                  />
                  <TextField
                    name={`${name}.${index}.maxDose`}
                    label="Dosis Max. (%)"
                    type="number"
                    className={classes.small}
                  />
                  <TextField
                    name={`${name}.${index}.disease`}
                    label="Enfermedad"
                  />
                  <TextField
                    name={`${name}.${index}.term`}
                    label="Plazo espera"
                    className={classes.small}
                  />
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
                </CardContent>
              </Card>
            ))}
        </>
      )}
    </FieldArray>
  )
}
