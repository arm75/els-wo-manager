import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { InventoryGroup } from "../../../core/models/inventory-group";


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
               private matSnackBar: MatSnackBar
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
        console.log("Inventory Group " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Inventory Group " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Inventory Group not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Inventory Group not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

