import { createRxDatabase, addRxPlugin } from 'rxdb'
import {
  addPouchPlugin,
  getRxStoragePouch
} from 'rxdb/plugins/pouchdb';

import { fieldSchema } from './schemas/FieldSchema'
import { treeSchema } from './schemas/TreeSchema'
import { reagentSchema } from './schemas/ReagentSchema'
import { historicSchema } from './schemas/HistoricSchema'

import { RxDBValidatePlugin } from 'rxdb/plugins/validate'
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'
import { RxDBUpdatePlugin } from 'rxdb/plugins/update'
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration'
import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments'

addRxPlugin(RxDBValidatePlugin)
addRxPlugin(RxDBJsonDumpPlugin)
addRxPlugin(RxDBUpdatePlugin)
addRxPlugin(RxDBQueryBuilderPlugin)
addRxPlugin(RxDBMigrationPlugin)
addRxPlugin(RxDBAttachmentsPlugin)
addPouchPlugin(require('pouchdb-adapter-idb'))

let _getDatabase: any // cached

export function getDatabase() {
  if (!_getDatabase) _getDatabase = createDatabase()
  return _getDatabase
}

async function createDatabase() {
  console.log('DatabaseService: Creating database..')
  const db = await createRxDatabase({
    name: 'agrodb',
    storage: getRxStoragePouch('idb'),
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
      reagents: {
        schema: reagentSchema,
      },
      historics: {
        schema: historicSchema,
      },
    })
    console.log('DatabaseService: Schemas added')
  } catch (err) {
    console.error(err)
    console.log('DatabaseService: Schemas failed')
  }
  return db
}
