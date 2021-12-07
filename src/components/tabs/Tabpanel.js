import Box from '@mui/material/Box'


const sxClasses = {
  root: {
    height: 'calc(100vh - 64px)',
    overflow: 'auto',
  },
  box: {
    height: '100%',
  },
};

export default function TabPanel(props) {
  const { children, value, index, ...other } = props


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={sxClasses.root}
      {...other}
    >
      {value === index && (
        <Box p={3} sx={sxClasses.box} {...other}>
          {children}
        </Box>
      )}
    </div>
  );
}
