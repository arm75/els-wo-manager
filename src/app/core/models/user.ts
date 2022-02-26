export interface User {
  id: number;
  username: string;
  password: string;
  roles: string;
  authorities: string;
  accountNonLocked: boolean;
  active: boolean;
  userGroupId: number;
  firstName: string;
  lastName: string;
  phoneNumb: string;
  altPhoneNumb: string;
  emailAddress: string;
  // fontSize: number;
  // themeColor: string;
  // darkTheme: boolean;
  createdDate: string;
  updatedDate: string;
}
