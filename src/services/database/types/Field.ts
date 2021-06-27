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
  tree: string
  quantity: number
}

export type FieldMethods = {}

export type FieldDocument = RxDocument<FieldType, FieldMethods>
