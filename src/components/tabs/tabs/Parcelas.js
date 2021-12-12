import { useState } from 'react'
import ParcelasTable from '../../table/tables/ParcelasTable'
import { Accordion, Container, CalculateNecesary } from '../../Exports'

const classes = {
  root: {
    height: '100%',
    width: {
      xs:' 100%',
      lg: '100%'
    },
    maxWidth: {
      xs:' 100%',
      lg: '100%'
    },
    padding: {
      xs: 0,
      sm: 0,
      md: 0,
      lg: 0
    },
  },
};

export default function Parcelas() {

  const [rowSelected, setRowSelected] = useState([])

  return (
    <Container sx={classes.root}>
      <ParcelasTable
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
      />
      <Accordion
        header="Cálculo cuba fitosanitario"
        subheader="Selecciona en la tabla y realiza aqui el calculo"
      >
        <CalculateNecesary rowSelected={rowSelected} />
      </Accordion>
    </Container>
  );
}
