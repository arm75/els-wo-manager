import {Inventory} from "./inventory";
import {InventoryLocation} from "./inventory-location";

export interface InventoryBucket {
  inventory: Inventory;
  location: InventoryLocation;
  qtyInStock: number;
  createdDate: string;
  updatedDate: string;
}
