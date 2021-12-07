import { useState } from 'react'
import ParcelasTable from '../../table/tables/ParcelasTable'
import { Accordion, Container, CalculateNecesary } from '../../Exports'

const classes = {
  root: {
    height: '100%',
    width: '100%',
    maxWidth: '100%',
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
