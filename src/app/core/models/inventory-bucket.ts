import {Inventory} from "./inventory";
import {InventoryLocation} from "./inventory-location";

export interface InventoryBucket {
  id?: number;
  inventory?: Inventory;
  location?: InventoryLocation;
  qtyInStock: number;
  createdDate?: string;
  updatedDate?: string;
}
