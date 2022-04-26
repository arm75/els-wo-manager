import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToolEquipmentItemService} from "../../../core/services/tool-equipment-item.service";
import {ToolEquipmentService} from "../../../core/services/tool-equipment.service";
import {FormBuilder} from "@angular/forms";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-tool-equipment-item-return',
  templateUrl: './tool-equipment-item-return.component.html',
  styleUrls: ['./tool-equipment-item-return.component.css']
})
export class ToolEquipmentItemReturnComponent implements OnInit {


  entityId: null;
  dataLoaded: boolean = false;
  formTitle: string = "Return Tool/Equipment Item";

  constructor(
    private matDialogRef: MatDialogRef<ToolEquipmentItemReturnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entityService: ToolEquipmentItemService,
    private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit(): void {

    this.entityId = this.data.entityId;

    console.log(this.entityId);
  }

  returnEntity() {
    this.entityService.return(this.entityId)
      .subscribe(data => {
          this.matDialogRef.close();
          this.globalSnackBarService.success("Tool/Equipment Item: " + this.entityId + " has been RETURNED.")
        }, error => {
          this.matDialogRef.close();
          this.globalSnackBarService.error(error.error.message);
        }
      );
  }

}
