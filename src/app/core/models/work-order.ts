import { Customer } from "./customer";
import { Location } from "./location";

export interface WorkOrder {
  id: number;
  customerId: number;
  customer: Customer;
  locationId: number;
  location: Location;
  // userId: number;
  // assignedTo: number;
  status: string;
  customerPo: string;
  quickDescription: string;
  description: string;
  entryInstruct: string;
  notes: string;
  createdDate: string;
  updatedDate: string;
}
