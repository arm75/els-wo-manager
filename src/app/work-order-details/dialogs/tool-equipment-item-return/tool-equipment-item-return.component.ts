import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToolEquipmentItemService} from "../../../core/services/tool-equipment-item.service";
import {ToolEquipmentService} from "../../../core/services/tool-equipment.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";
import {ToolEquipmentItem} from "../../../core/models/tool-equipment-item";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-tool-equipment-item-return',
  templateUrl: './tool-equipment-item-return.component.html',
  styleUrls: ['./tool-equipment-item-return.component.css']
})
export class ToolEquipmentItemReturnComponent implements OnInit {


  dataLoaded: boolean = false;
  formTitle: string = "Return Tool/Equipment Item";
  woId: null;
  entityId: null;
  entityData!: ToolEquipmentItem;
  editForm: FormGroup = new FormGroup({});

  constructor(
    private matDialogRef: MatDialogRef<ToolEquipmentItemReturnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entityService: ToolEquipmentItemService,
    private toolEquipmentService: ToolEquipmentService,
    private formBuilder: FormBuilder,
    private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.woId = this.data.woId;
    this.entityId = this.data.entityId;
    if (this.entityId != null) {
      this.entityService.get(this.entityId)
        .toPromise()
        .then(data => {
          this.entityData = data;
          this.editForm = this.formBuilder.group({
            'id': new FormControl(this.entityData.id),
            'workOrder': new FormControl(this.entityData.workOrder),
            'toolEquipmentId': new FormControl(this.entityData.toolEquipmentId, [Validators.required]),
            'entityName': new FormControl(this.entityData.entityName),
            'notes': new FormControl(this.entityData.notes),
            'pricePerDay': new FormControl(this.entityData.pricePerDay, [Validators.required]),
            'days': new FormControl(this.entityData.days, [Validators.required]),
            'status': new FormControl(this.entityData.status, [Validators.required]),
            'total': new FormControl('')
          });
        })
        .catch(error => {
        })
        .finally(()=>{
            this.dataLoaded = true;
          }
        );
    }
    //console.log(this.entityId);
  }

  returnEntity() {
    this.entityService.return(this.editForm.value)
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
