import { WorkOrder } from "./work-order";

export interface ToolEquipmentItem {
  id: number;
  workOrder: WorkOrder;
  toolEquipmentId: number;
  entityName: string,
  status: string;
  notes: string;
  days: number;
  pricePerDay: number;
  totalPrice: number;
  createdDate: string;
  updatedDate: string;
}
