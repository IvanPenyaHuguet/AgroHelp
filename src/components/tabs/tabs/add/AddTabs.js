import { useState } from 'react'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import { TabPanel, Container, ParcelaAdd, TreeAdd } from '../../../Exports'

import { makeStyles } from '@material-ui/core/styles'

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  }
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 0,
    backgroundColor: 'white',
    height: '100%',
    minHeight: '100%',
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    padding: 0,
  },
  bar: {
    width: '100%',
    padding: 0,
  },
  screen: {
    height: 'calc(100vh - 128px)',
    overflow: 'auto',
  },
})

export default function AddTabs() {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Container className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <Tab label="Histórico" {...a11yProps(0)} />
            <Tab label="Parcelas" {...a11yProps(1)} />
            <Tab label="Cultivo" {...a11yProps(2)} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.screen}>
        Histórico
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.screen}>
        <ParcelaAdd />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.screen}>
        <TreeAdd />
      </TabPanel>
    </Container>
  )
}
