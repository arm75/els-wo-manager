import {Customer} from "./customer";

export interface Location {
  id: number;
  customerId: number;
  customer: Customer;
  entityName: string;
  address: string;
  unit: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumb: string;
  altPhoneNumb: string;
  emailAddress: string;
  createdDate: string;
  updatedDate: string;
}
