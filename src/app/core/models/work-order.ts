export interface WorkOrder {

  id: number;
  customerId: number;
  userId: number;
  locationId: number;
  assignedTo: number;
  status: number;
  customerPo: string;
  description: string;
  entryInstruct: string;
  notes: string;
  tenantName: string;
  tenantPhone: string;
  tenantUnit: string;
  createdDate: string;
  updatedDate: string;

}
