import { RxCollection } from 'rxdb'
import { TreeType, TreeMethods } from '../types/Tree'

export type TreeCollectionMethods = {}

export type TreeCollection = RxCollection<
  TreeType,
  TreeMethods,
  TreeCollectionMethods
>
