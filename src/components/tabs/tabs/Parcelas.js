import Container from '../../layouts/Container'
import ParcelasTable from '../../table/tables/ParcelasTable'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
})

export default function Parcelas() {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <ParcelasTable />
    </Container>
  )
}
