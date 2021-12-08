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
    width: {
      xs:' 100%',
      lg: '100%'
    },
    maxWidth: {
      xs:' 100%',
      lg: '100%'
    },
    padding: {
      xs: 0,
      sm: 0,
      md: 0
    },
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
  },
  zeroPadding: {
    padding: 0,
  },
  tab: {
    fontWeight: '900',
    color: 'white'
  }
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
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="nav tabs"            
          >
            <Tab label="Parcelas" {...a11yProps(0)} sx={sxClasses.tab} />
            <Tab label="Reactivos" {...a11yProps(1)} sx={sxClasses.tab}/>
            <Tab label="Histórico" {...a11yProps(2)} sx={sxClasses.tab}/>
            <Tab label="Cultivo" {...a11yProps(3)} sx={sxClasses.tab}/>
            <Tab label="Añadir" {...a11yProps(4)} sx={sxClasses.tab}/>
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
