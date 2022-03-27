import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToolEquipmentService } from "../../../core/services/tool-equipment.service";
import { ToolEquipment } from "../../../core/models/tool-equipment";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-tool-equipment-edit',
  templateUrl: './tool-equipment-edit.component.html',
  styleUrls: ['./tool-equipment-edit.component.css']
})
export class ToolEquipmentEditComponent implements OnInit {
  dataLoaded: boolean = false;
  formTitle: string = "Edit Tool/Equipment";
  entityId: null;
  entityData!: ToolEquipment;
  editForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<ToolEquipmentEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: ToolEquipmentService,
               private formBuilder: FormBuilder,
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
          this.editForm = this.formBuilder.group({
            'id': new FormControl(this.entityData.id),
	          'entityName': new FormControl(this.entityData.entityName, [Validators.required]),
	          'description': new FormControl(this.entityData.description),
	          'pricePerDay': new FormControl(this.entityData.pricePerDay, [Validators.required])
          })
          this.dataLoaded = true;
        })
        .catch(error => {
          this.matDialogRef.close();
          this.globalSnackBarService.error(error.error.message);
        });
    }
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Tool/Equipment: " + this.editForm.value.id + " has been updated.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }
}
