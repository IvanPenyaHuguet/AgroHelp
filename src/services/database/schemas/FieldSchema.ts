import { RxJsonSchema } from 'rxdb'
import { FieldType, FieldMethods } from '../types/Field'
import { FieldCollectionMethods } from '../collections/FieldCollection'

export const fieldSchema: RxJsonSchema<FieldType> = {
  title: 'field',
  version: 0,
  description: 'describes a field on property',
  type: 'object',
  keyCompression: false,
  properties: {
    refCast: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    area: {
      type: 'number',
      minimum: 0,
    },
    tree: {
      ref: 'tree',
      type: 'string',
    },
    quantity: {
      type: 'number',
      minimum: 0,
    },
    createdAt: {
      type: 'number',
      minimum: 0,
    },
    updatedAt: {
      type: 'number',
      minimum: 0,
    },
    province: {
      type: 'number',
      minimum: 0,
    },
    town: {
      type: 'number',
      minimum: 0,
    },
    polygon: {
      type: 'number',
      minimum: 0,
    },
    parcel: {
      type: 'number',
      minimum: 0,
    },
    plantedArea: {
      type: 'number',
      minimum: 0,
    },
  },
  required: ['refCast', 'name', 'area', 'plantedArea', 'tree'],
}

export const fieldMethods: FieldMethods = {}

export const fieldCollectionMethods: FieldCollectionMethods = {}
