import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { InventoryItemService } from "../../../core/services/inventory-item.service";
import { InventoryItem } from "../../../core/models/inventory-item";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-inventory-item-delete',
  templateUrl: './inventory-item-delete.component.html',
  styleUrls: ['./inventory-item-delete.component.css']
})
export class InventoryItemDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Inventory Item";
  entityId: null;
  entityData!: InventoryItem;

  constructor( private matDialogRef: MatDialogRef<InventoryItemDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryItemService,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.entityId = this.data.entityId;
    if (this.entityId != null) {
      this.entityService.get(this.entityId)
        .toPromise()
        .then(data => {
          this.entityData = data;
        })
        .catch(error => {
        })
        .finally(() => {
          this.dataLoaded = true;
        }
      );
    }
  }

  deleteEntity(): void {
    this.entityService.delete(this.entityId)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Inventory Item: " + this.entityId  + " has been deleted.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }

}
