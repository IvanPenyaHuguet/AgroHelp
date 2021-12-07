import { RxJsonSchema } from 'rxdb'
import { v4 as uuidv4 } from 'uuid'
import { TreeType, TreeMethods } from '../types/Tree'
import { TreeCollectionMethods } from '../collections/TreeCollection'

export const treeSchema: RxJsonSchema<TreeType> = {
  title: 'tree',
  version: 0,
  primaryKey: 'id',
  description: 'describes a type of tree',
  type: 'object',
  keyCompression: false,
  properties: {
    id: {
      type: 'string',
      default: uuidv4()
    },
    name: {
      type: 'string',
    },
    variety: {
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
  required: ['name'],
}

export const treeMethods: TreeMethods = {}

export const treeCollectionMethods: TreeCollectionMethods = {}
