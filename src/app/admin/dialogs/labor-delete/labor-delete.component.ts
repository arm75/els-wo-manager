import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LaborService } from "../../../core/services/labor.service";
import { Labor } from "../../../core/models/labor";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";

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
        this.globalSnackBarService.success("Labor: " + this.entityId  + " has been deleted.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }
}
