import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToolEquipmentItemService } from "../../../core/services/tool-equipment-item.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ToolEquipmentItem } from "../../../core/models/tool-equipment-item";


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
        console.log("Tool/Equipment Item " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Tool/Equipment Item " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Tool/Equipment Item not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Tool/Equipment Item not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

