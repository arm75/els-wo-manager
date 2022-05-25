import {WorkOrder} from "./work-order";

export interface SubcontractorItem {
  id: number;
  workOrder: WorkOrder;
  subcontractorId: number;
  entityName: string;
  status: string;
  notes: string;
  total: number;
  createdDate: string;
  updatedDate: string;
}
