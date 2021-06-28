import { useState, useEffect, useContext } from 'react'

import TableContainer from '../components/TableContainer'
import ManualTable from '../components/manual/ManualTable'
import { AlertContext } from '../../../context/AlertContext'

import * as dayjs from 'dayjs'

import * as Database from '../../../services/database/Database'

const columns = [
  {
    field: 'nReg',
    headerName: 'N Registro',
    type: 'number',
    description: 'Numero de registro agrovademecum',
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Nombre',
    type: 'string',
    description: 'Nombre del reactivo comercial',
    flex: 1,
  },
  {
    field: 'product',
    headerName: 'Producto',
    type: 'string',
    description: 'Nombre comun o principio activo',
    flex: 1,
  },
  {
    field: 'quantityTotal',
    headerName: 'Cantidad comprada',
    type: 'number',
    description: 'Cantidad total comprada',
    flex: 0.5,
    valueFormatter: params => {
      return `${params.value} ${params.row.unit}`
    },
    valueParser: value => Number(value),
  },
  {
    field: 'quantityUsed',
    headerName: 'Cantidad usada',
    type: 'number',
    description: 'Cantidad total utilizada',
    flex: 0.5,
    valueFormatter: params => {
      return `${params.value} ${params.row.unit}`
    },
    valueParser: value => Number(value),
  },
  {
    field: 'supplier',
    headerName: 'Proveedor',
    type: 'string',
    flex: 1,
  },
  {
    field: 'price',
    headerName: 'Precio',
    type: 'number',
    flex: 0.6,
    valueFormatter: params => {
      return `${params.value} €`
    },
    valueParser: value => Number(value),
  },
  {
    field: 'observations',
    headerName: 'Observaciones',
    type: 'string',
    flex: 1,
  },
  /* {
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
  }, */
]

export default function TableWithData() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const { setAlert } = useContext(AlertContext)
  const [selected, setSelected] = useState([])

  useEffect(async () => {
    setLoading(true)
    const db = await Database.getDatabase()
    const objects = await db.reagents.find().exec()
    setLoading(false)
    setData(objects)
  }, [])

  const handleDeleteClick = () => {
    Database.getDatabase()
      .then(res => {
        res.reagents
          .find({ selector: { _id: { $in: selected.map(r => r._id) } } })
          .remove()
      })
      .then(res => {
        setAlert({
          type: 'success',
          message: 'Reactivos borrador con éxito',
        })
      })
      .catch(err => {
        console.error(err)
        setAlert({
          type: 'error',
          message:
            'Error no controlado, envia un email a ivanpenyahuguet@gmail.com',
        })
      })
  }

  return (
    <TableContainer>
      <ManualTable
        columns={columns}
        rows={data}
        loading={loading}
        handleDeleteClick={handleDeleteClick}
        selected={selected}
        setSelected={setSelected}
      />
    </TableContainer>
  )
}
