import { WorkOrder } from "./work-order";
import { Labor } from "./labor";

export interface LaborItem {
  id: number;
  workOrder: WorkOrder;
  laborId: number;
  entityName: string;
  notes: string;
  hours: number;
  minutes: number;
  ratePerHour: number;
  totalTime: number;
  totalPrice: number;
  createdDate: string;
  updatedDate: string;
}
