import {Inventory} from "./inventory";
import {WorkOrder} from "./work-order";

export interface InventoryItem {
  id: number;
  inventory: Inventory;
  workOrder: WorkOrder;
  entityName: string,
  notes: string;
  unitPrice: number;
  qty: number;
  totalPrice: number;
  createdDate: string;
  updatedDate: string;
}
