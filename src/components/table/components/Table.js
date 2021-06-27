import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import TableContainer from './TableContainer'
import CustomLoadingOverlay from './LoadingOverlay'
import CustomNoRowsOverlay from './NoRowsOverlay'

export default function Table({ columns, rows, loading }) {
  return (
    <TableContainer>
      <DataGrid
        components={{
          Toolbar: GridToolbar,
          LoadingOverlay: CustomLoadingOverlay,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        columns={columns}
        rows={rows}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </TableContainer>
  )
}
