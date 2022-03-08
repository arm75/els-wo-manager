import { Customer } from "./customer";
import { Location } from "./location";

export interface WorkOrder {
  id: number;
  customerId: number;
  customer: Customer;
  locationId: number;
  location: Location;
  status: string;
  customerPo: string;
  quickDescription: string;
  description: string;
  entryInstruct: string;
  inventoryItemsTotal: number;
  laborItemsTotal: number;
  subcontractorItemsTotal: number;
  toolEquipmentItemsTotal: number;
  workOrderTotal: number;
  createdDate: string;
  updatedDate: string;
}
