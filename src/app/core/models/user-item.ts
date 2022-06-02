import {WorkOrder} from "./work-order";

export interface UserItem {
  id: number;
  workOrder: WorkOrder;
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumb: string;
  altPhoneNumb: string;
  emailAddress: string;
  createdDate: string;
  updatedDate: string;
}
