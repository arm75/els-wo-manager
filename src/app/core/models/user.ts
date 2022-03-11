export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  authorities: string;
  accountNonLocked: boolean;
  active: boolean;
  firstName: string;
  lastName: string;
  phoneNumb: string;
  altPhoneNumb: string;
  emailAddress: string;
  createdDate: string;
  updatedDate: string;
}
