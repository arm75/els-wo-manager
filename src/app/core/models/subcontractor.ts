import {SubcontractorGroup} from "./subcontractor-group";

export interface Subcontractor {
  id: number;
  subcontractorGroup: SubcontractorGroup;
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
