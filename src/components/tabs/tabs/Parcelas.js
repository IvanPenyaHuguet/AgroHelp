import { useState } from 'react'
import ParcelasTable from '../../table/tables/ParcelasTable'
import { Accordion, Container, CalculateNecesary } from '../../Exports'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    maxWidth: '100%',
  },
})

export default function Parcelas() {
  const classes = useStyles()
  const [rowSelected, setRowSelected] = useState([])

  return (
    <Container className={classes.root}>
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
  )
}
