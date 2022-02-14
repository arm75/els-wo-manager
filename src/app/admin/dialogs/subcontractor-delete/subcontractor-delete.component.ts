import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SubcontractorService } from "../../../core/services/subcontractor.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subcontractor } from "../../../core/models/subcontractor";


@Component({
  selector: 'app-subcontractor-delete',
  templateUrl: './subcontractor-delete.component.html',
  styleUrls: ['./subcontractor-delete.component.css']
})
export class SubcontractorDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Subcontractor";
  entityId: null;
  entityData!: Subcontractor;

  constructor( private matDialogRef: MatDialogRef<SubcontractorDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: SubcontractorService,
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
        console.log("Subcontractor " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Subcontractor " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Subcontractor not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Subcontractor not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

