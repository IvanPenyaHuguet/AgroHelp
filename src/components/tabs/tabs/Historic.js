import Container from '../../layouts/Container'
import HistoricTable from '../../table/tables/HistoricTable'

const sxClasses = {
  root: {
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

export default function Historic() {

  return (
    <Container sx={sxClasses.root}>
      <HistoricTable />
    </Container>
  );
}
