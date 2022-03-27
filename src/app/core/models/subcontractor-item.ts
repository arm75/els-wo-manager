import {WorkOrder} from "./work-order";
import {Subcontractor} from "./subcontractor";

export interface SubcontractorItem {
  id: number;
  subcontractor: Subcontractor;
  workOrder: WorkOrder;
  entityName: string,
  notes: string;
  unitPrice: number;
  qty: number;
  totalPrice: number;
  createdDate: string;
  updatedDate: string;
}
