import { RxCollection } from 'rxdb'
import { ReagentType, ReagentMethods } from '../types/Reagent'

export type ReagentCollectionMethods = {}

export type ReagentCollection = RxCollection<
  ReagentType,
  ReagentMethods,
  ReagentCollectionMethods
>
