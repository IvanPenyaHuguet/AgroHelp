import { RxDocument } from 'rxdb'

export type FieldType = {
  name: string
  refCast: string
  province: number
  town: number
  polygon: number
  parcel: number
  area: number
  plantedArea: number
  createdAt: number
  updatedAt: number
  deleted: boolean
  type: {
    tree: 'string'
    quantity: number
    [k: string]: unknown
  }[]
  [k: string]: unknown
}

export type FieldMethods = {}

export type FieldDocument = RxDocument<FieldType, FieldMethods>
