import {WorkOrder} from "./work-order";

export interface InventoryItem {
  id: number;
  workOrder: WorkOrder;
  inventoryId: number; // copied from Inventory
  bucketId: number; // copied from Inventory.bucket selected
  entityName: string; // set by Inventory.entityName selected
  notes: string; // set by Inventory.description selected
  qty: number;  // manually entered, but deducted from the InventoryBucket selected, when WorkOrder is closed
  unitCost: number; // set by Inventory.unitCost selected
  unitPrice: number;  // set by Inventory.unitPrice selected
  totalPrice: number; // will be generated
  createdDate: string;
  updatedDate: string;
}
