import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToolEquipmentService } from "../../../core/services/tool-equipment.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ToolEquipment } from "../../../core/models/tool-equipment";


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
        console.log("Tool/Equipment " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Tool/Equipment " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Tool/Equipment not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Tool/Equipment not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

