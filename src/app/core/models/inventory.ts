import {InventoryGroup} from "./inventory-group";
import {InventoryBucket} from "./inventory-bucket";

export interface Inventory {
  id: number;
  inventoryGroup: InventoryGroup;
  buckets: InventoryBucket[];
  entityName: string;
  description: string;
  unitCost: number;
  unitPrice: number;
  totalInStock: number; // calculated from bucket totals
  createdDate: string;
  updatedDate: string;
}
