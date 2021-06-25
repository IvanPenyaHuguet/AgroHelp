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

  constructor(_getDatabase: DatabaseType | null) {
    this.database = this.cachedDB(_getDatabase)
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
  async addCollections(_getDatabase: DatabaseType | null): Promise<void> {
    if (_getDatabase) {
      console.log('DatabaseService: adding schemas..')
      try {
        await _getDatabase.addCollections({
          fields: {
            schema: fieldSchema,
          },
          trees: {
            schema: treeSchema,
          },
        })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
const db = new InitDatabase(_getDatabase)
export default db
