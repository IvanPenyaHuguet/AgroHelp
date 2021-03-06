import { RxDocument } from 'rxdb'

export type ReagentType = {
  id: string;
  name: string
  product: string
  quantityTotal: number
  unit: string
  price: number
  supplier: string
  quantityUsed: number
  observations: string
  createdAt: number
  updatedAt: number
  deletedAt: number
  nReg: number
  trees?: {
    tree?: string
    minDose?: number
    maxDose?: number
    disease?: string
    term?: number
    [k: string]: unknown
  }[]
  [k: string]: unknown
}

export type ReagentMethods = {}

export type ReagentDocument = RxDocument<ReagentType, ReagentMethods>
