import {Customer} from "./customer";

export interface Location {
  id: number;
  customerId: number;
  customer: Customer;
  entityName: string;
  createdDate: string;
  updatedDate: string;
}
