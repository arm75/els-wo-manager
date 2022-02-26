import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { InventoryItemService } from "../../../core/services/inventory-item.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { InventoryItem } from "../../../core/models/inventory-item";


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
        console.log("Inventory Item " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Inventory Item " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Inventory Item not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Inventory Item not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

