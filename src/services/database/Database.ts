import { createRxDatabase, addRxPlugin } from 'rxdb'

import { fieldSchema } from './schemas/FieldSchema'
import { treeSchema } from './schemas/TreeSchema'

import { RxDBValidatePlugin } from 'rxdb/plugins/validate'
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'
import { RxDBUpdatePlugin } from 'rxdb/plugins/update'

addRxPlugin(RxDBValidatePlugin)
addRxPlugin(RxDBJsonDumpPlugin)
addRxPlugin(RxDBUpdatePlugin)
addRxPlugin(RxDBQueryBuilderPlugin)
addRxPlugin(require('pouchdb-adapter-idb'))

let _getDatabase: any // cached

export function getDatabase() {
  if (!_getDatabase) _getDatabase = createDatabase()
  return _getDatabase
}

async function createDatabase() {
  console.log('DatabaseService: Creating database..')
  const db = await createRxDatabase({
    name: 'agrodb',
    adapter: 'idb',
    multiInstance: false, // <- multiInstance (optional, default: true) (leveldown false)
    eventReduce: true, // <- eventReduce (optional, default: true)
  })
  console.log('DatabaseService: Database created')
  console.log('DatabaseService: adding schemas..')
  try {
    await db.addCollections({
      fields: {
        schema: fieldSchema,
      },
      trees: {
        schema: treeSchema,
      },
    })
    console.log('DatabaseService: Schemas added')
  } catch (err) {
    console.error(err)
    console.log('DatabaseService: Schemas failed')
  }
  return db
}
