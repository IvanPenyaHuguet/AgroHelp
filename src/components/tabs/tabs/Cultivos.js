import Container from '../../layouts/Container'
import CultivosTable from '../../table/tables/CultivosTable'

const sxClasses = {
  root: {
    height: '100%',
    width: '100%',
    maxWidth: '100%',
  },
};

export default function Cultivos() {

  return (
    <Container sx={sxClasses.root}>
      <CultivosTable />
    </Container>
  );
}
