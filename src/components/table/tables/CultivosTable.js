import { useState, useEffect, useCallback, useContext } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import TableContainer from '../components/TableContainer'
import CustomLoadingOverlay from '../components/LoadingOverlay'
import CustomNoRowsOverlay from '../components/NoRowsOverlay'
import * as dayjs from 'dayjs'
import { useRxCollection } from 'rxdb-hooks'

import * as Database from '../../../services/database/Database'
import { AddCultivoSchema } from '../../../services/validators/AddCultivoSchema'
import { AlertContext } from '../../../context/AlertContext';
import DeleteActionCell from '../components/DeleteActionCell';

const columns = [
  {
    field: 'name',
    headerName: 'Nombre',
    type: 'string',
    description: 'Nombre del cultivo',
    flex: 1,
    editable: true,
    preProcessEditCellProps: async (params) => {
      const hasError = await !AddCultivoSchema.isValid({
          name: params.props.value
      });       
      return { ...params.props, error: hasError || undefined };
    },
  },
  {
    field: 'variety',
    headerName: 'Variedad',
    type: 'string',
    description: 'Nombre de la Variedad',
    flex: 1,
    editable: true    
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
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    getActions: ({ id }) => {
      return [
        <DeleteActionCell id={id} collection="trees"/>
      ]
    }
  },
]

export default function TableWithData() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectionModel, setSelectionModel] = useState([])
  const collection = useRxCollection('trees')
  const { setAlert } = useContext(AlertContext)

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      const db = await Database.getDatabase()
      const objects = await db.trees.find().exec()
      setLoading(false)
      setData(objects)
    }
    fetch();    
  }, [])

  const handleSelection = selection => {
    setSelectionModel(selection.selectionModel)
  }

  const handleCellEditCommit = useCallback (async params => {    
    try {
      const document = await collection.findOne({
        selector: {
          id: params.id
        }
      }).exec();      
      const toUpdate = {
        [params.field]: params.value,
        updatedAt: dayjs().valueOf()
      }
      await document.update({ $set: toUpdate });      

    } catch (err) { 
      console.error(err)
      setAlert({
        type: 'error',
        message:
          'Error no controlado, envia un email a ivanpenyahuguet@gmail.com',
      })
    }  
  },[collection, setAlert])

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
        // checkboxSelection
        // selectionModel={selectionModel}
        // onSelectionModelChange={handleSelection}
        onCellEditCommit={handleCellEditCommit}
      />
    </TableContainer>
  )
}
