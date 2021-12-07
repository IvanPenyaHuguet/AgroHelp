import Container from '../../layouts/Container'
import HistoricTable from '../../table/tables/HistoricTable'

const sxClasses = {
  root: {
    height: '100%',
    width: '100%',
    maxWidth: '100%',
  },
};

export default function Historic() {

  return (
    <Container sx={sxClasses.root}>
      <HistoricTable />
    </Container>
  );
}
