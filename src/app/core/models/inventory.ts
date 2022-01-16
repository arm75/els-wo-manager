export interface Inventory {

  id: number;
  invGroupId: number;
  invLocationId: number;
  invName: string;
  description: string;
  ourCost: number;
  price: number;
  qtyOnHand: number;
  taxable: boolean;
  taxRateId: number;
  createdDate: string;
  updatedDate: string;

}
