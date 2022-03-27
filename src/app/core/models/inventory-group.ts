import {Inventory} from "./inventory";

export interface InventoryGroup {
  id: number;
  inventory: Inventory[];
  parent: InventoryGroup;
  children: InventoryGroup[];
  entityName: string;
  description: string;
  createdDate: string;
  updatedDate: string;
}
