import db from '../../electron/database/Init.ts'

export default class Service {
  constructor(collection) {
    this.query = undefined
    this.collection = db[collection]
  }

  addFind() {
    this.query = this.collection.find()
  }

  executeQuery() {
    return this.query.exec().then(result => result)
  }
}
