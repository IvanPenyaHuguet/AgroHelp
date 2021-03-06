import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import TableContainer from './TableContainer'
import CustomLoadingOverlay from './LoadingOverlay'
import CustomNoRowsOverlay from './NoRowsOverlay'

export default function Table({ columns, rows, loading, ...props }) {
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
        loading={loading}
        rowsPerPageOptions={[10, 25, 50, 100]}
        getRowId={row => row.id}
      />
    </TableContainer>
  )
}
