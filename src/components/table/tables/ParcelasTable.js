import { useState, useEffect } from 'react'
import Table from '../components/Table'

import * as Database from '../../../services/database/Database'

const columns = [
  {
    field: 'refCast',
    headerName: 'Ref. Catastro',
    description: 'Referencia catastral de la parcela',
    flex: 0.8,
  },
  {
    field: 'name',
    headerName: 'Nombre',
    description: 'Nombre de la parcela',
    flex: 0.7,
  },
  {
    field: 'area',
    headerName: 'Área (ha)',
    description: 'Area de la parcela total en hectareas',
    flex: 0.5,
  },
  ,
  {
    field: 'plantedArea',
    headerName: 'Área Plantada (ha)',
    description: 'Area de la parcela plantada en hectareas',
    flex: 0.5,
  },
  {
    field: 'tree.name',
    headerName: 'Arbol',
    flex: 0.6,
  },
  {
    field: 'tree.variety',
    headerName: 'Variedad',
    description: 'Variedad de los arboles si procede',
    flex: 0.6,
  },
  {
    field: 'quantity',
    headerName: 'Cantidad',
    description: 'Cantidad de arboles en la parcela',
    flex: 0.5,
  },
  {
    field: 'province',
    headerName: 'Provincia',
    description: 'Provincia en la que se encuentra la parcela',
    flex: 0.5,
    hide: true,
  },
  {
    field: 'town',
    headerName: 'Ciudad',
    description: 'Ciudad en la que se encuentra la parcela',
    flex: 0.5,
    hide: true,
  },
  {
    field: 'polygon',
    headerName: 'Polígono',
    flex: 0.5,
    hide: true,
  },
  {
    field: 'parcel',
    headerName: 'Parcela',
    flex: 0.5,
    hide: true,
  },
]

export default function TableWithData() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    setLoading(true)
    const db = await Database.getDatabase()
    const objects = await db.fields.find().exec()
    setLoading(false)
    setData(objects)
  }, [])
  console.log(data)
  return <Table columns={columns} rows={data} loading={loading} />
}
