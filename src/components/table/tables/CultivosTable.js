import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import TableContainer from '../components/TableContainer'
import CustomLoadingOverlay from '../components/LoadingOverlay'
import CustomNoRowsOverlay from '../components/NoRowsOverlay'
import * as dayjs from 'dayjs'

import * as Database from '../../../services/database/Database'

const columns = [
  {
    field: 'name',
    headerName: 'Nombre',
    type: 'string',
    description: 'Nombre del cultivo',
    flex: 1,
  },
  {
    field: 'variety',
    headerName: 'Variedad',
    type: 'string',
    description: 'Nombre de la Variedad',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Creado',
    description: 'Cuando fue creado',
    type: 'dateTime',
    flex: 1,
    hide: true,
    valueFormatter: params => {
      return dayjs(params.value).format('DD/MM/YYYY H:mm')
    },
    valueParser: value => dayjs(value, 'DD/MM/YYYY H:mm', 'es').valueOf(),
  },
  {
    field: 'updatedAt',
    headerName: 'Actualizado',
    type: 'dateTime',
    description: 'Cuando fue actualizado',
    flex: 1,
    hide: true,
    valueFormatter: params => {
      return dayjs(params.value).format('DD/MM/YYYY H:mm')
    },
    valueParser: value => dayjs(value, 'DD/MM/YYYY H:mm', 'es').valueOf(),
  },
]

export default function TableWithData() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectionModel, setSelectionModel] = useState([])

  useEffect(async () => {
    setLoading(true)
    const db = await Database.getDatabase()
    const objects = await db.trees.find().exec()
    setLoading(false)
    setData(objects)
  }, [])

  const handleSelection = selection => {
    setSelectionModel(selection.selectionModel)
  }

  return (
    <TableContainer>
      <DataGrid
        components={{
          Toolbar: GridToolbar,
          LoadingOverlay: CustomLoadingOverlay,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        columns={columns}
        rows={data}
        loading={loading}
        rowsPerPageOptions={[10, 25, 50, 100]}
        getRowId={row => row.id}
        checkboxSelection
        selectionModel={selectionModel}
        onSelectionModelChange={handleSelection}
      />
    </TableContainer>
  )
}
