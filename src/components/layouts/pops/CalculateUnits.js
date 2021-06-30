import { useEffect, useState } from 'react'
import { Container, SelectInput } from '../../Exports'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '25px',
  },
  input: {
    width: '200px',
    margin: '10px',
  },
}))

const Unidades = [
  {
    ind: 1,
    unit: '%',
    equivalence: 1,
  },
  {
    ind: 2,
    unit: 'cc/ha',
    equivalence: 10000,
  },
  {
    ind: 3,
    unit: 'cc/L',
    equivalence: 10,
  },
  {
    ind: 4,
    unit: 'mL/L',
    equivalence: 10,
  },
  {
    ind: 5,
    unit: 'L/ha',
    equivalence: 10,
  },
]

export default function CalculateUnit() {
  const classes = useStyles()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [inputUnit, setInputUnit] = useState(2)
  const [outputUnit, setOutputUnit] = useState(1)

  useEffect(() => {
    setOutput(
      (input * Unidades[inputUnit - 1].equivalence) /
        Unidades[outputUnit - 1].equivalence
    )
  }, [input, output, inputUnit, outputUnit])

  return (
    <Container className={classes.root}>
      <Group
        label="A convertir"
        unidad={inputUnit}
        value={input}
        setValue={setInput}
        setUnidad={setInputUnit}
      />
      <Group
        label="Convertido"
        unidad={outputUnit}
        value={output}
        setValue={setOutput}
        setUnidad={setOutputUnit}
        disabled
      />
    </Container>
  )
}

function Group({ label, unidad, value, setValue, setUnidad, ...props }) {
  const classes = useStyles()
  const handleChange = event => {
    setUnidad(event.target.value)
  }
  const handleInput = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <TextField
        label={label}
        value={value}
        type="number"
        onChange={handleInput}
        className={classes.input}
        {...props}
      />
      <FormControl className={classes.input}>
        <InputLabel>Unidad {label}</InputLabel>
        <Select value={unidad} onChange={handleChange}>
          {Unidades.map((unidad, i) => (
            <MenuItem key={i} value={unidad.ind}>
              {unidad.unit}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  )
}
