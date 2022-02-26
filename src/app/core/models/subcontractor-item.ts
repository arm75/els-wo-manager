import {WorkOrder} from "./work-order";
import {Subcontractor} from "./subcontractor";

export interface SubcontractorItem {
  id: number;
  workOrderId: number;
  workOrder: WorkOrder;
  subcontractorId: number;
  subcontractor: Subcontractor;
  entityName: string,
  notes: string;
  unitPrice: number;
  qty: number;
  totalPrice: number;
  createdDate: string;
  updatedDate: string;
}
