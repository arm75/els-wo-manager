import {InventoryGroup} from "./inventory-group";
import {InventoryLocation} from "./inventory-location";

export interface Inventory {
  id: number;
  inventoryGroupId: number;
  inventoryGroup: InventoryGroup;
  inventoryLocationId: number;
  inventoryLocation: InventoryLocation;
  entityName: string;
  description: string;
  qtyInStock: number;
  unitCost: number;
  unitPrice: number;
  // taxable: boolean;
  // taxRateId: number;
  createdDate: string;
  updatedDate: string;
}
