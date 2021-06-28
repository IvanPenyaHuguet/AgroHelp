import { useState, useEffect } from 'react'
import * as dayjs from 'dayjs'
import Table from '../components/Table'

import * as Database from '../../../services/database/Database'

const columns = [
  {
    field: 'refCast',
    headerName: 'Ref. Catastro',
    type: 'string',
    description: 'Referencia catastral de la parcela',
    flex: 0.8,
  },
  {
    field: 'name',
    headerName: 'Nombre',
    type: 'string',
    description: 'Nombre de la parcela',
    flex: 0.7,
  },
  {
    field: 'area',
    headerName: 'Área (ha)',
    description: 'Area de la parcela total en hectareas',
    type: 'number',
    flex: 0.5,
  },
  ,
  {
    field: 'plantedArea',
    headerName: 'Área Plantada (ha)',
    type: 'number',
    description: 'Area de la parcela plantada en hectareas',
    flex: 0.5,
  },
  {
    field: 'tree.name',
    headerName: 'Arbol',
    type: 'string',
    flex: 0.6,
  },
  {
    field: 'tree.variety',
    headerName: 'Variedad',
    description: 'Variedad de los arboles si procede',
    type: 'string',
    flex: 0.6,
  },
  {
    field: 'quantity',
    headerName: 'Cantidad',
    type: 'number',
    description: 'Cantidad de arboles en la parcela',
    flex: 0.5,
  },
  {
    field: 'province',
    type: 'number',
    headerName: 'Provincia',
    description: 'Provincia en la que se encuentra la parcela',
    flex: 0.5,
    hide: true,
  },
  {
    field: 'town',
    type: 'number',
    headerName: 'Ciudad',
    description: 'Ciudad en la que se encuentra la parcela',
    flex: 0.5,
    hide: true,
  },
  {
    field: 'polygon',
    type: 'number',
    headerName: 'Polígono',
    flex: 0.5,
    hide: true,
  },
  {
    field: 'parcel',
    type: 'number',
    headerName: 'Parcela',
    flex: 0.5,
    hide: true,
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

export default function TableWithData() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectionModel, setSelectionModel] = useState([])

  useEffect(async () => {
    setLoading(true)
    const db = await Database.getDatabase()
    const objects = await db.fields.find().exec()
    /* const objects2 = await objects.map(object => {
      return { ...object, tree: object.populate('trees') }
    })
    console.log(objects2)
    console.log(objects) */
    setLoading(false)
    setData(objects)
  }, [])

  const handleSelection = selection => {
    setSelectionModel(selection.selectionModel)
  }

  return (
    <Table
      columns={columns}
      rows={data}
      loading={loading}
      checkboxSelection
      selectionModel={selectionModel}
      onSelectionModelChange={handleSelection}
    />
  )
}
