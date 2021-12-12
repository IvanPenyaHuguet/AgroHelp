import Paper from '../../layouts/Paper'

const sxClasses = {
  root: {
    display: 'flex',
    height: '100%',
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
      md: 0,
      lg: 0
    },
  },
};

export default function Container({ children }) {

  return <Paper sx={sxClasses.root}>{children}</Paper>;
}
