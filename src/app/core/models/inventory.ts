import {InventoryGroup} from "./inventory-group";

export interface Inventory {
  id: number;
  inventoryGroup: InventoryGroup;
  entityName: string;
  description: string;
  totalInStock: number;
  unitCost: number;
  unitPrice: number;
  createdDate: string;
  updatedDate: string;
}
