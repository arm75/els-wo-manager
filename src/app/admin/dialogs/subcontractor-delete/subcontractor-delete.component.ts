import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SubcontractorService } from "../../../core/services/subcontractor.service";
import { Subcontractor } from "../../../core/models/subcontractor";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";

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
        this.globalSnackBarService.success("Subcontractor " + this.entityId  + " deleted successfully.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }
}
