import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LaborService } from "../../../core/services/labor.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Labor } from "../../../core/models/labor";


@Component({
  selector: 'app-labor-delete',
  templateUrl: './labor-delete.component.html',
  styleUrls: ['./labor-delete.component.css']
})
export class LaborDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Labor";
  entityId: null;
  entityData!: Labor;

  constructor( private matDialogRef: MatDialogRef<LaborDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: LaborService,
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
        console.log("Labor " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Labor " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Labor not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Labor not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

