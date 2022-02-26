import { WorkOrder } from "./work-order";
import { ToolEquipment } from "./tool-equipment";

export interface ToolEquipmentItem {
  id: number;
  workOrderId: number;
  workOrder: WorkOrder;
  toolsEquipId: number;
  toolsEquip: ToolEquipment;
  entityName: string,
  status: string;
  notes: string;
  days: number;
  pricePerDay: number;
  totalPrice: number;
  createdDate: string;
  updatedDate: string;
}
