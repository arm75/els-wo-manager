import { WorkOrder } from "./work-order";
import { Labor } from "./labor";

export interface LaborItem {
  id: number;
  workOrderId: number;
  workOrder: WorkOrder;
  laborId: number;
  labor: Labor;
  notes: string;
  hours: number;
  minutes: number;
  ratePerHour: number;
  totalTime: number;
  totalPrice: number;
  createdDate: string;
  updatedDate: string;
}
