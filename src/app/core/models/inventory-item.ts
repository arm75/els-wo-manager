export interface InventoryItem {

  id: number;
  inventoryId: number;
  workOrderId: number;
  notes: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
  createdDate: string;
  updatedDate: string;

}
