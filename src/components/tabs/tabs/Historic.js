import Container from '../../layouts/Container'
import HistoricTable from '../../table/tables/HistoricTable'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    maxWidth: '100%',
  },
})

export default function Historic() {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <HistoricTable />
    </Container>
  )
}
