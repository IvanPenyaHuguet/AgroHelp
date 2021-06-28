import Container from '../../layouts/Container'
import ReagentsTable from '../../table/tables/ReagentsTable'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    maxWidth: '100%',
  },
})

export default function Reagents() {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <ReagentsTable />
    </Container>
  )
}
