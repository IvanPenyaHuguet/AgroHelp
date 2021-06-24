import { RxJsonSchema } from 'rxdb'
import { TreeType, TreeMethods } from '../types/Tree'
import { TreeCollectionMethods } from '../collections/TreeCollection'

export const treeSchema: RxJsonSchema<TreeType> = {
  title: 'tree',
  version: 0,
  description: 'describes a type of tree',
  type: 'object',
  keyCompression: true,
  properties: {
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
    deleted: {
      type: 'boolean',
      default: false,
    },
  },
  required: ['name'],
}

export const treeMethods: TreeMethods = {}

export const treeCollectionMethods: TreeCollectionMethods = {}
