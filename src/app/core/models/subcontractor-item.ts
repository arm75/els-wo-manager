import {WorkOrder} from "./work-order";

export interface SubcontractorItem {
  id: number;
  workOrder: WorkOrder;
  subcontractorId: number;
  entityName: string,
  status: string;
  notes: string;
  unitPrice: number;
  qty: number;
  totalPrice: number;
  createdDate: string;
  updatedDate: string;
}
