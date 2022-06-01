import {WorkOrder} from "./work-order";

export interface InventoryItem {
  id: number;
  workOrder: WorkOrder;
  inventoryGroupId: number;
  inventoryId: number;
  bucketId: number;
  entityName: string;
  notes: string;
  qty: number;
  unitCost: number;
  unitPrice: number;
  totalPrice: number;
  createdDate: string;
  updatedDate: string;
}
