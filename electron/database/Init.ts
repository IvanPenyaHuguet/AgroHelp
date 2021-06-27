import { createRxDatabase, addRxPlugin } from 'rxdb'

import { fieldSchema } from './schemas/FieldSchema'
import { treeSchema } from './schemas/TreeSchema'

addRxPlugin(require('pouchdb-adapter-idb'))

let _getDatabase: any // cached

/* export class InitDatabase {
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
} */
/* const db = new InitDatabase(_getDatabase) */

export function getDatabase() {
  if (!_getDatabase) _getDatabase = createDatabase()
  return _getDatabase
}

async function createDatabase() {
  console.log('DatabaseService: Creating database..')
  const db = await createRxDatabase({
    name: 'agrodb',
    adapter: 'idb',
    multiInstance: true, // <- multiInstance (optional, default: true) (leveldown false)
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
