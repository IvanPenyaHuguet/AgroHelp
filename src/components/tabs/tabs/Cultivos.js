import Container from '../../layouts/Container'
import CultivosTable from '../../table/tables/CultivosTable'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    maxWidth: '100%',
  },
})

export default function Cultivos() {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <CultivosTable />
    </Container>
  )
}
