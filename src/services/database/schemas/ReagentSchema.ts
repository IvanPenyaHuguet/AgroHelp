import { RxJsonSchema } from 'rxdb'
import { ReagentType, ReagentMethods } from '../types/Reagent'
import { ReagentCollectionMethods } from '../collections/ReagentCollection'

export const reagentSchema: RxJsonSchema<ReagentType> = {
  title: 'reagent',
  version: 0,
  description: 'Describes a reagent on property',
  type: 'object',
  keyCompression: false,
  properties: {
    name: {
      type: 'string',
    },
    product: {
      type: 'string',
    },
    quantityTotal: {
      type: 'number',
      minimum: 0,
    },
    price: {
      type: 'number',
      minimum: 0,
    },
    unit: {
      type: 'string',
    },
    supplier: {
      type: 'string',
    },
    observations: {
      type: 'string',
    },
    quantityUsed: {
      type: 'number',
      minimum: 0,
    },
    nReg: {
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
    trees: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          tree: {
            ref: 'trees',
            type: 'string',
          },
          minDose: {
            type: 'number',
            minimum: 0,
          },
          maxDose: {
            type: 'number',
            minimum: 0,
          },
          disease: {
            type: 'string',
          },
          term: {
            type: 'number',
            minimum: 0,
          },
        },
      },
    },
  },
  required: ['name', 'product', 'quantityTotal', 'unit'],
}

export const reagentMethods: ReagentMethods = {}

export const reagentCollectionMethods: ReagentCollectionMethods = {}
