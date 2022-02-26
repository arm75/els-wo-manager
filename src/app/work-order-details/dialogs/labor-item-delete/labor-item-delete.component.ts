import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LaborItemService } from "../../../core/services/labor-item.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LaborItem } from "../../../core/models/labor-item";


@Component({
  selector: 'app-labor-item-delete',
  templateUrl: './labor-item-delete.component.html',
  styleUrls: ['./labor-item-delete.component.css']
})
export class LaborItemDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Labor Item";
  entityId: null;
  entityData!: LaborItem;

  constructor( private matDialogRef: MatDialogRef<LaborItemDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: LaborItemService,
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
        console.log("Labor Item " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Labor Item " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Labor Item not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Labor Item not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

