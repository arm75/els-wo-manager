import {Inventory} from "./inventory";

export interface InventoryGroup {
  id: number;
  inventory: Inventory[];
  entityName: string;
  description: string;
  createdDate: string;
  updatedDate: string;
}
