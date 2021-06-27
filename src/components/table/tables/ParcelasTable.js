import { useState, useEffect } from 'react'
import Table from '../components/Table'
import Service from '../../../services/Service'

import * as Database from '../../../services/database/Database'

const columns = [
  {
    field: 'Ref. Catastro',
    flex: 1,
  },
  {
    field: 'Nombre',
    flex: 1,
  },
  {
    field: 'Area (ha)',
    flex: 0.5,
  },
]

export default function TableWithData() {
  const [data, setData] = useState([])

  useEffect(async () => {
    const db = await Database.getDatabase()
    console.log(db)
    const objects = await db.fields.find().exec()
    setData(objects)
  }, [])
  console.log(data)
  return <Table columns={columns} rows={data} />
}
