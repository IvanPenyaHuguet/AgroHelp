import React, { useState, useEffect } from 'react'
import * as dayjs from 'dayjs'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CustomLoadingOverlay from '../components/LoadingOverlay'
import CustomNoRowsOverlay from '../components/NoRowsOverlay'
import { Paper } from '../../Exports'

import * as Database from '../../../services/database/Database'

const useStyles = {
  root: {
    display: 'flex',
    height: 'calc(100% - 60px)',
    width: '100%',
  },
}

const columns = [
  {
    field: 'refCast',
    headerName: 'Ref. Catastro',
    type: 'string',
    description: 'Referencia catastral de la parcela',
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Nombre',
    type: 'string',
    description: 'Nombre de la parcela',
    flex: 1,
  },
  {
    field: 'area',
    headerName: 'Área (ha)',
    description: 'Area de la parcela total en hectareas',
    type: 'number',
    width: 140,
  },
  {
    field: 'plantedArea',
    headerName: 'Área Plantada (ha)',
    type: 'number',
    description: 'Area de la parcela plantada en hectareas',
    width: 200,
  },
  {
    field: 'tree',
    headerName: 'Cultivo',
    type: 'string',
    flex: 1,
    valueFormatter: ({ value }) => value.name + ' ' + value.variety,
  },
  {
    field: 'quantity',
    headerName: 'Cantidad',
    type: 'number',
    description: 'Cantidad de arboles en la parcela',
    width: 140,
  },
  {
    field: 'province',
    type: 'number',
    headerName: 'Provincia',
    description: 'Provincia en la que se encuentra la parcela',
    width: 150,
    hide: true,
  },
  {
    field: 'town',
    type: 'number',
    headerName: 'Ciudad',
    description: 'Ciudad en la que se encuentra la parcela',
    width: 140,
    hide: true,
  },
  {
    field: 'polygon',
    type: 'number',
    headerName: 'Polígono',
    width: 140,
  },
  {
    field: 'parcel',
    type: 'number',
    headerName: 'Parcela',
    width: 140,
  },
  {
    field: 'createdAt',
    headerName: 'Creado',
    description: 'Cuando fue creado',
    type: 'dateTime',
    flex: 0.6,
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
    flex: 0.6,
    hide: true,
    valueFormatter: params => {
      return dayjs(params.value).format('DD/MM/YYYY H:mm')
    },
    valueParser: value => dayjs(value, 'DD/MM/YYYY H:mm', 'es').valueOf(),
  },
]

const TableWithData = ({ rowSelected, setRowSelected }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(async () => {
    setLoading(true)
    const db = await Database.getDatabase()
    const objects = await db.fields.find().exec()
    setLoading(false)
    setData(objects)
  }, [])

  const handleRowSelected = param => {
    const newSelected = [...rowSelected]
    param.isSelected
      ? newSelected.push(param.data)
      : newSelected.splice(newSelected.indexOf(param.data), 1)
    setRowSelected(newSelected)
  }

  return (
    <Paper sx={useStyles.root}>
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
        onRowSelected={handleRowSelected}
        checkboxSelection
        disableSelectionOnClick
      />
    </Paper>
  );
}
export default React.memo(TableWithData)
