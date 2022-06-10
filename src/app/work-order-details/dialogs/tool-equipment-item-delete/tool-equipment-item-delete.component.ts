import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToolEquipmentItemService } from "../../../core/services/tool-equipment-item.service";
import { ToolEquipmentItem } from "../../../core/models/tool-equipment-item";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-tool-equipment-item-delete',
  templateUrl: './tool-equipment-item-delete.component.html',
  styleUrls: ['./tool-equipment-item-delete.component.css']
})
export class ToolEquipmentItemDeleteComponent implements OnInit {
  dataLoaded: boolean = false;
  formTitle: string = "Delete Tool/Equipment Item";
  entityId: null;
  entityData!: ToolEquipmentItem;

  constructor( private matDialogRef: MatDialogRef<ToolEquipmentItemDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: ToolEquipmentItemService,
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
        this.globalSnackBarService.success("Tool/Equipment Item: " + this.entityId  + " has been deleted.")
      }, error => {
        this.matDialogRef.close(false);
        this.globalSnackBarService.error(error.error.message);
      }
    );
  }

}
