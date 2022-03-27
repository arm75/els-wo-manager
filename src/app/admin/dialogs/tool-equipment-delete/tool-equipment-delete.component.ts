import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToolEquipmentService } from "../../../core/services/tool-equipment.service";
import { ToolEquipment } from "../../../core/models/tool-equipment";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-tool-equipment-delete',
  templateUrl: './tool-equipment-delete.component.html',
  styleUrls: ['./tool-equipment-delete.component.css']
})
export class ToolEquipmentDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Tool/Equipment";
  entityId: null;
  entityData!: ToolEquipment;

  constructor( private matDialogRef: MatDialogRef<ToolEquipmentDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: ToolEquipmentService,
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
        this.globalSnackBarService.success("Tool/Equipment: " + this.entityId  + " has been deleted.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }
}
