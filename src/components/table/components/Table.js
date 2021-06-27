import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import TableContainer from './TableContainer'
import CustomLoadingOverlay from './LoadingOverlay'
import CustomNoRowsOverlay from './NoRowsOverlay'

export default function Table({ columns, rows }) {
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
      />
    </TableContainer>
  )
}
