import { RxDocument } from 'rxdb'

export type HistoricType = {
  nameField: string
  refCastField: string
  nameReagent: string
  nRegReagent: number
  nameTree: string
  date: number
  areaField: number
  literWater: number
  quantityUsedReagent: number
  maxDoseReagent: number
  dose: number
  unitReagent: string
  createdAt: number
  updatedAt: number
}

export type HistoricMethods = {}

export type HistoricDocument = RxDocument<HistoricType, HistoricMethods>
