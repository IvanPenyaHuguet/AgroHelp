import { useEffect, useState } from 'react'
import { Container, SelectInput } from '../../Exports'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'


const sxClasses = {
  root: {
    margin: '25px',
  },
  input: {
    width: '200px',
    margin: '10px',
  }
};

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
    <Container sx={sxClasses.root}>
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
  );
}

function Group({ label, unidad, value, setValue, setUnidad, ...props }) {

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
        variant="standard"
        type="number"
        onChange={handleInput}
        sx={sxClasses.input}
        {...props}
      />
      <FormControl variant="standard" sx={sxClasses.input}>
        <InputLabel>Unidad {label}</InputLabel>
        <Select variant="standard" value={unidad} onChange={handleChange}>
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
