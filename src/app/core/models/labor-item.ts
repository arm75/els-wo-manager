import { WorkOrder } from "./work-order";
import { Labor } from "./labor";

export interface LaborItem {
  id: number;
  labor: Labor;
  workOrder: WorkOrder;
  notes: string;
  hours: number;
  minutes: number;
  ratePerHour: number;
  totalTime: number;
  totalPrice: number;
  createdDate: string;
  updatedDate: string;
}
