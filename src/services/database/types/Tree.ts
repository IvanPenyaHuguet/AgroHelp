import { RxDocument } from 'rxdb'

export type TreeType = {
  id: string;
  name: string
  variety?: string
  createdAt: number
  updatedAt: number
}
export type TreeMethods = {}

export type TreeDocument = RxDocument<TreeType, TreeMethods>
