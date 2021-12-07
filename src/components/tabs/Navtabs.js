import { useState } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import Container from '../layouts/Container'
import TabPanel from './Tabpanel'
import { Parcelas, AddTabs, Cultivos, Reagents, Historic } from '../Exports'

const sxClasses = {
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
  zeroPadding: {
    padding: 0,
  },
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  }
}

export default function NavTabs() {

  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Container sx={sxClasses.root}>
      <AppBar position="static" sx={sxClasses.bar}>
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
            <Tab label="Cultivo" {...a11yProps(3)} />
            <Tab label="Añadir" {...a11yProps(4)} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Parcelas />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Reagents />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Historic />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Cultivos />
      </TabPanel>
      <TabPanel value={value} index={4} sx={sxClasses.zeroPadding}>
        <AddTabs />
      </TabPanel>
    </Container>
  );
}
