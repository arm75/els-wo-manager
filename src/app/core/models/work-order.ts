import { Customer } from "./customer";
import { Location } from "./location";
import { User } from "./user";
import { WorkOrderStatus } from "../types/work-order-status";

export interface WorkOrder {
  id: number;
  customer: Customer;
  customerId: number;
  customerEntityName: string;
  location: Location;
  locationId: number;
  locationEntityName: string;
  assignedUsers: User[];
  status: WorkOrderStatus;
  quickDescription: string;
  description: string;
  contactName: string;
  contactEmail: string;
  contactPhoneNumb: string;
  contactAltPhoneNumb: string;
  notes: string;
  privateNotes: string;
  entryInstruct: string;
  inventoryItemsTotal: number;
  laborItemsTotal: number;
  subcontractorItemsTotal: number;
  toolEquipmentItemsTotal: number;
  workOrderTotal: number;
  createdDate: string;
  updatedDate: string;
}
