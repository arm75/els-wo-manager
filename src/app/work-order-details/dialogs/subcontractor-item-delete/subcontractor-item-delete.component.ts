import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SubcontractorItemService } from "../../../core/services/subcontractor-item.service";
import { SubcontractorItem } from "../../../core/models/subcontractor-item";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-subcontractor-item-delete',
  templateUrl: './subcontractor-item-delete.component.html',
  styleUrls: ['./subcontractor-item-delete.component.css']
})
export class SubcontractorItemDeleteComponent implements OnInit {
  dataLoaded: boolean = false;
  formTitle: string = "Delete Subcontractor Item";
  entityId: null;
  entityData!: SubcontractorItem;

  constructor( private matDialogRef: MatDialogRef<SubcontractorItemDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: SubcontractorItemService,
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
        })
        .catch(error => {
        })
        .finally(() => {
          this.dataLoaded = true;
        }
      );
    }
  }

  deleteEntity(): void {
    this.entityService.delete(this.entityId)
      .subscribe(data => {
        this.matDialogRef.close(true);
        this.globalSnackBarService.success("Subcontractor Item: " + this.entityId  + " deleted successfully.")
      }, error => {
        this.matDialogRef.close(false);
        this.globalSnackBarService.error("An error has occurred: " + error);
      }
    );
  }

}
