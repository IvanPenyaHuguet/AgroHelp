import { RxJsonSchema } from 'rxdb'
import { HistoricType, HistoricMethods } from '../types/Historic'
import { HistoricCollectionMethods } from '../collections/HistoricCollection'

export const historicSchema: RxJsonSchema<HistoricType> = {
  title: 'historic',
  version: 0,
  description: 'describes a historic',
  type: 'object',
  keyCompression: false,
  properties: {
    nameField: {
      type: 'string',
    },
    refCastField: {
      type: 'string',
    },
    nameReagent: {
      type: 'string',
    },
    nRegReagent: {
      type: 'number',
      minimum: 0,
    },
    lotReagent: {
      type: 'string',
    },
    nameTree: {
      type: 'string',
    },
    date: {
      type: 'number',
      minimum: 0,
    },
    dose: {
      type: 'number',
      minimum: 0,
    },
    areaField: {
      type: 'number',
      minimum: 0,
    },
    literWater: {
      type: 'number',
      minimum: 0,
    },
    quantityUsedReagent: {
      type: 'number',
      minimum: 0,
    },
    maxDoseReagent: {
      type: 'number',
      minimum: 0,
    },
    unitReagent: {
      type: 'string',
    },
    createdAt: {
      type: 'number',
      minimum: 0,
    },
    updatedAt: {
      type: 'number',
      minimum: 0,
    },
  },
  required: [
    'nameField',
    'refCastField',
    'nameReagent',
    'nameTree',
    'date',
    'areaField',
    'literWater',
    'quantityUsedReagent',
    'unitReagent',
    'lotReagent',
  ],
}

export const historicMethods: HistoricMethods = {}

export const historicCollectionMethods: HistoricCollectionMethods = {}
