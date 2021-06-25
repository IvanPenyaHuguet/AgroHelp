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
import { DatabaseCollections } from './collections/DatabaseCollections'

addRxPlugin(require('pouchdb-adapter-leveldb'))

let _getDatabase: DatabaseType | null = null // cached

export class InitDatabase {
  database: DatabaseType | null
  collection: any

  constructor(_getDatabase: DatabaseType | null) {
    this.database = this.cachedDB(_getDatabase)
    this.addCollections(this.database).then(
      (res: any): any => (this.collection = res)
    )
  }

  cachedDB(_getDatabase: DatabaseType | null): DatabaseType | null {
    if (!_getDatabase) {
      this.createDB().then((res: DatabaseType) => {
        _getDatabase = res
        console.log('DatabaseService: created database')
        console.log('DatabaseService: adding schemas')
        this.addCollections(_getDatabase).then(() => {
          console.log('DatabaseService: added schemas')
        })
      })
    }
    return _getDatabase
  }

  async createDB(): Promise<DatabaseType> {
    console.log('DatabaseService: creating database..')
    return await createRxDatabase<DatabaseCollections>({
      name: 'agrodb',
      adapter: leveldown,
      multiInstance: false, // <- multiInstance (optional, default: true)
      eventReduce: true, // <- eventReduce (optional, default: true)
    })
  }
  async addCollections(_getDatabase: DatabaseType | null) {
    if (_getDatabase) {
      return await _getDatabase.addCollections({
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
  }
}
const db = new InitDatabase(_getDatabase)
export default db
