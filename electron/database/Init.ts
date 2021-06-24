import { createRxDatabase, addRxPlugin } from 'rxdb'
import leveldown from 'leveldown'

import {
  fieldSchema,
  fieldMethods,
  fieldCollectionMethods,
} from './schemas/FieldSchema'
import {
  treeSchema,
  treeMethods,
  treeCollectionMethods,
} from './schemas/TreeSchema'
import { DatabaseType } from './types/DatabaseTypes'

addRxPlugin(require('pouchdb-adapter-leveldb'))

export const db: Promise<DatabaseType> = createRxDatabase({
  name: 'agrodb',
  adapter: leveldown,
  multiInstance: false, // <- multiInstance (optional, default: true)
  eventReduce: true, // <- eventReduce (optional, default: true)
})

async function addSchemas(): Promise<void> {
  const dbToAdd: DatabaseType = await db
  await dbToAdd.addCollections({
    fields: {
      schema: fieldSchema,
      methods: fieldMethods,
      statics: fieldCollectionMethods,
    },
    trees: {
      schema: treeSchema,
      methods: treeMethods,
      statics: treeCollectionMethods,
    },
  })
}
addSchemas()
