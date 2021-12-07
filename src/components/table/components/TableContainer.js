import Paper from '../../layouts/Paper'

const sxClasses = {
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
};

export default function Container({ children }) {

  return <Paper sx={sxClasses.root}>{children}</Paper>;
}
