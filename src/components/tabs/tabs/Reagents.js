import Container from '../../layouts/Container'
import ReagentsTable from '../../table/tables/ReagentsTable'

const sxClasses = {
  root: {
    height: '100%',
    width: '100%',
    maxWidth: '100%',
  },
};

export default function Reagents() {

  return (
    <Container sx={sxClasses.root}>
      <ReagentsTable />
    </Container>
  );
}
