import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import TableContainer from './TableContainer'
import CustomLoadingOverlay from './LoadingOverlay'

export default function Table({ columns, rows }) {
  return (
    <TableContainer>
      <DataGrid
        components={{
          Toolbar: GridToolbar,
          LoadingOverlay: CustomLoadingOverlay,
        }}
        columns={columns}
        rows={rows}
      />
    </TableContainer>
  )
}
