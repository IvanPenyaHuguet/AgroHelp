import Paper from '../../layouts/Paper'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
})

export default function Container({ children }) {
  const classes = useStyles()
  return <Paper className={classes.root}>{children}</Paper>
}
