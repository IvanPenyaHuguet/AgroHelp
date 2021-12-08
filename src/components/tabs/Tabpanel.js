import { Box } from '../Exports';


const sxClasses = {
  root: {    
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
  },
  box: {
    height: '100%',
  },
};

export default function TabPanel(props) {
  const { children, value, index, height = '64px', ...other } = props


  return (
    <Box
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={[sxClasses.root, { overflow: value !== index ? 'hidden' : 'auto', height: value !== index ? '0' : `calc(100vh - ${height})` }]}
      {...other}
    >
      {value === index && (
        <Box p={3} sx={sxClasses.box} {...other}>
          {children}
        </Box>
      )}
    </Box>
  );
}
