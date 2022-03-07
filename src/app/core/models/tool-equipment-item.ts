import { WorkOrder } from "./work-order";
import { ToolEquipment } from "./tool-equipment";

export interface ToolEquipmentItem {
  id: number;
  workOrderId: number;
  workOrder: WorkOrder;
  toolEquipmentId: number;
  toolEquipment: ToolEquipment;
  entityName: string,
  status: string;
  notes: string;
  days: number;
  pricePerDay: number;
  totalPrice: number;
  createdDate: string;
  updatedDate: string;
}
