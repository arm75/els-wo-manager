import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { InventoryService } from "../../../core/services/inventory.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Inventory } from "../../../core/models/inventory";


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
        console.log("Inventory " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Inventory " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Inventory not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Inventory not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

