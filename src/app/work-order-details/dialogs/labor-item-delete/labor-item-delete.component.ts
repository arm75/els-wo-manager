import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LaborItemService } from "../../../core/services/labor-item.service";
import { LaborItem } from "../../../core/models/labor-item";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

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
        this.matDialogRef.close();
        this.globalSnackBarService.success("Labor Item: " + this.entityId  + " has been deleted.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      }
    );
  }

}
