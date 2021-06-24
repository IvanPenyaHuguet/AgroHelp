import { RxCollection } from 'rxdb'
import { FieldType, FieldMethods } from '../types/Field'

export type FieldCollectionMethods = {}

export type FieldCollection = RxCollection<
  FieldType,
  FieldMethods,
  FieldCollectionMethods
>
