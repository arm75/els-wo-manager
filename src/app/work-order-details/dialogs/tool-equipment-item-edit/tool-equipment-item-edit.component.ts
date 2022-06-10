import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ToolEquipmentItemService } from "../../../core/services/tool-equipment-item.service";
import { ToolEquipmentItem } from "../../../core/models/tool-equipment-item";
import {MatSelect} from "@angular/material/select";
import {ToolEquipmentService} from "../../../core/services/tool-equipment.service";
import {finalize} from "rxjs/operators";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-tool-equipment-item-edit',
  templateUrl: './tool-equipment-item-edit.component.html',
  styleUrls: ['./tool-equipment-item-edit.component.css']
})
export class ToolEquipmentItemEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Tool/Equipment Item";
  woId: null;
  entityId: null;
  entityData!: ToolEquipmentItem;
  editForm: FormGroup = new FormGroup({});

  @ViewChild('toolEquipmentSelect')
  toolEquipmentSelect!: MatSelect;
  toolEquipmentLoaded: any;
  toolEquipmentIdSelected: any;
  toolEquipmentSelectedLoaded: any;

  constructor( private matDialogRef: MatDialogRef<ToolEquipmentItemEditComponent>,
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
          this.loadToolEquipmentSelect();
        }
      );
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.entityName === o2.entityName && o1.id === o2.id;
  }

  selectChange() {
    this.toolEquipmentService.get(this.toolEquipmentIdSelected)
      .pipe(finalize(() => {
        this.editForm.controls['toolEquipmentId'].setValue(this.toolEquipmentSelectedLoaded.id);
        this.editForm.controls['entityName'].setValue(this.toolEquipmentSelectedLoaded.entityName);
        this.editForm.controls['notes'].setValue(this.toolEquipmentSelectedLoaded.description);
        this.editForm.controls['pricePerDay'].setValue(this.toolEquipmentSelectedLoaded.pricePerDay);
      }))
      .subscribe(data => {
        this.toolEquipmentSelectedLoaded = data;
      }, error => {
      }
    );
  }

  loadToolEquipmentSelect() {
    this.toolEquipmentService.getAll().subscribe(
      data => {
        this.toolEquipmentLoaded = data.sort((a, b) => {
          return a.entityName.localeCompare(b.entityName); });
      },error => {
      }
    );
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        this.matDialogRef.close(true);
        this.globalSnackBarService.success("Tool/Equipment Item: " + this.editForm.value.id + " has been updated.")
      }, error => {
        this.matDialogRef.close(false);
        this.globalSnackBarService.error(error.error.message);
      }
    );
  }

}
