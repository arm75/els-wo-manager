import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { InventoryLocationService } from "../../../core/services/inventory-location.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { InventoryLocation } from "../../../core/models/inventory-location";


@Component({
  selector: 'app-inventory-location-delete',
  templateUrl: './inventory-location-delete.component.html',
  styleUrls: ['./inventory-location-delete.component.css']
})
export class InventoryLocationDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Inventory Location";
  entityId: null;
  entityData!: InventoryLocation;

  constructor( private matDialogRef: MatDialogRef<InventoryLocationDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryLocationService,
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
        console.log("Inventory Location " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Inventory Location " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Inventory Location not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Inventory Location not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

