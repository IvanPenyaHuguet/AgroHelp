import { RxCollection } from 'rxdb'
import { HistoricType, HistoricMethods } from '../types/Historic'

export type HistoricCollectionMethods = {}

export type HistoricCollection = RxCollection<
  HistoricType,
  HistoricMethods,
  HistoricCollectionMethods
>
