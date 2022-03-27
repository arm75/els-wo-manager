import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { InventoryService } from "../../../core/services/inventory.service";
import { Inventory } from "../../../core/models/inventory";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-inventory-delete',
  templateUrl: './inventory-delete.component.html',
  styleUrls: ['./inventory-delete.component.css']
})
export class InventoryDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Inventory";
  entityId: null;
  entityData!: Inventory;

  constructor( private matDialogRef: MatDialogRef<InventoryDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryService,
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
          this.dataLoaded = true;
        })
        .catch(error => {
          this.matDialogRef.close();
          this.globalSnackBarService.error(error.error.message);
        });
    }
  }

  deleteEntity(): void {
    this.entityService.delete(this.entityId)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Inventory: " + this.entityId  + " has been deleted.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }
}
