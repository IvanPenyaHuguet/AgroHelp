import { useState } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import {
  TabPanel,
  Container,
  ParcelaAdd,
  TreeAdd,
  ReagentAdd,
  HistoricAdd,
} from '../../../Exports'


const sxClasses = {
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
};


function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  }
}

export default function AddTabs() {

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
            <Tab label="Histórico" {...a11yProps(0)} />
            <Tab label="Parcelas" {...a11yProps(1)} />
            <Tab label="Cultivo" {...a11yProps(2)} />
            <Tab label="Reactivos" {...a11yProps(3)} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0} sx={sxClasses.screen}>
        <HistoricAdd />
      </TabPanel>
      <TabPanel value={value} index={1} sx={sxClasses.screen}>
        <ParcelaAdd />
      </TabPanel>
      <TabPanel value={value} index={2} sx={sxClasses.screen}>
        <TreeAdd />
      </TabPanel>
      <TabPanel value={value} index={3} sx={sxClasses.screen}>
        <ReagentAdd />
      </TabPanel>
    </Container>
  );
}
