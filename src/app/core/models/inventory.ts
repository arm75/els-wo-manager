export interface Inventory {
  id: number;
  entityName: string;
  description: string;
  unitCost: number;
  unitPrice: number;
  qtyInStock: number;
  taxable: boolean;
  taxRateId: number;
  createdDate: string;
  updatedDate: string;
}
