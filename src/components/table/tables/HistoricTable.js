import { useState, useEffect } from 'react'
import * as dayjs from 'dayjs'
import Table from '../components/Table'

import * as Database from '../../../services/database/Database'

const columns = [
  {
    field: 'nameField',
    headerName: 'Nombre Parcela',
    type: 'string',
    description: 'Nombre de la parcela',
    flex: 0.7,
  },
  {
    field: 'refCastField',
    headerName: 'Ref. Catastro',
    type: 'string',
    description: 'Referencia Catastro de la parcela',
    flex: 0.7,
    hide: true,
  },
  {
    field: 'nameReagent',
    headerName: 'Reactivo',
    type: 'string',
    description: 'Nombre del reactivo',
    flex: 0.7,
  },
  {
    field: 'nRegReagent',
    headerName: 'Num. Reactivo',
    type: 'string',
    description: 'Numero registro del reactivo',
    flex: 0.5,
    hide: true,
  },
  {
    field: 'nameTree',
    headerName: 'Cultivo',
    type: 'string',
    description: 'Nombre del cultivo',
    flex: 0.7,
  },
  {
    field: 'date',
    headerName: 'Fecha',
    description: 'Fecha realizacion',
    type: 'date',
    flex: 0.5,
    valueFormatter: params => {
      return dayjs(params.value).format('DD/MM/YYYY')
    },
    valueParser: value => dayjs(value, 'DD/MM/YYYY', 'es').valueOf(),
  },
  {
    field: 'dose',
    type: 'number',
    headerName: 'Dosis (%)',
    description: 'Dosis pulverizada en el cultivo',
    flex: 0.5,
  },
  {
    field: 'quantityUsedReagent',
    type: 'number',
    headerName: 'Cantidad utilizada',
    description: 'Cantidad pulverizada en el cultivo',
    flex: 0.5,
    valueFormatter: params => {
      return `${params.value} ${params.row.unitReagent}`
    },
    valueParser: value => Number(value),
  },
  {
    field: 'unitReagent',
    headerName: 'U.',
    type: 'string',
    description: 'Unidad del reactivo añadido',
    flex: 0.2,
    hide: true,
  },
  {
    field: 'literWater',
    type: 'number',
    headerName: 'Litros',
    description: 'Litros de agua gastados',
    flex: 0.5,
    hide: true,
  },
  {
    field: 'areaField',
    type: 'number',
    headerName: 'Area Parcela',
    description: 'Area de la parcela',
    flex: 0.5,
    hide: true,
  },
  {
    field: 'maxDoseReagent',
    type: 'number',
    headerName: 'Dosis Max.',
    description: 'Dosis maxima permitida',
    flex: 0.5,
    valueFormatter: params => {
      return `${params.value} ${params.row.unitReagent}`
    },
    valueParser: value => Number(value),
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

  useEffect(async () => {
    setLoading(true)
    const db = await Database.getDatabase()
    const objects = await db.historics.find().exec()
    setLoading(false)
    setData(objects)
  }, [])

  return <Table columns={columns} rows={data} loading={loading} />
}
