import { useState } from 'react'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import Container from '../layouts/Container'
import TabPanel from './Tabpanel'
import Parcelas from './tabs/Parcelas'

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
    minHeight: '100vh',
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
  },
})

export default function NavTabs() {
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
            <Tab label="Parcelas" {...a11yProps(0)} />
            <Tab label="Reactivos" {...a11yProps(1)} />
            <Tab label="Histórico" {...a11yProps(2)} />
            <Tab label="Añadir" {...a11yProps(3)} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Parcelas />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Page Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Page Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Page F
      </TabPanel>
    </Container>
  )
}
