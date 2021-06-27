import Box from '@material-ui/core/Box'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    height: 'calc(100vh - 64px)',
    overflow: 'auto',
  },
  box: {
    height: '100%',
  },
})

export default function TabPanel(props) {
  const { children, value, index, ...other } = props
  const classes = useStyles()

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classes.root}
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.box} {...other}>
          {children}
        </Box>
      )}
    </div>
  )
}
