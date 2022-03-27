import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import { InventoryGroup } from "../../../core/models/inventory-group";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-inventory-group-delete',
  templateUrl: './inventory-group-delete.component.html',
  styleUrls: ['./inventory-group-delete.component.css']
})
export class InventoryGroupDeleteComponent implements OnInit {
  dataLoaded: boolean = false;
  formTitle: string = "Delete Inventory Group";
  entityId: null;
  entityData!: InventoryGroup;

  constructor( private matDialogRef: MatDialogRef<InventoryGroupDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryGroupService,
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
          console.log(error);
        });
    }
  }

  deleteEntity(): void {
    this.entityService.delete(this.entityId)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Inventory Group: " + this.entityId  + " has been deleted.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }

}
