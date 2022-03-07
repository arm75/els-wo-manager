export interface User {
  id: number;
  username: string;
  password: string;
  roles: string;
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
