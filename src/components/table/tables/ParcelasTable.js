import Table from '../components/Table'
import Service from '../../../services/Service'

const columns = [
  {
    field: 'Ref. Catastro',
    flex: 1,
  },
  {
    field: 'Nombre',
    flex: 1,
  },
  {
    field: 'Area (ha)',
    flex: 0.5,
  },
]

export default function TableWithData() {
  const service = new Service(fields)
  const data = service.addFind().executeQuery()
  console.log(data)
  return <Table columns={columns} rows={rows} />
}
