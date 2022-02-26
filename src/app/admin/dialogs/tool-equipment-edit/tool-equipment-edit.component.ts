import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ToolEquipmentService } from "../../../core/services/tool-equipment.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ToolEquipment } from "../../../core/models/tool-equipment";

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
          this.editForm = this.formBuilder.group({
            'id': new FormControl(this.entityData.id),
	          'entityName': new FormControl(this.entityData.entityName),
	          'description': new FormControl(this.entityData.description),
	          'pricePerDay': new FormControl(this.entityData.pricePerDay)
          })
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        console.log("Tool/Equipment " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("Tool/Equipment " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Tool/Equipment not edited: " + error);
        this.matSnackBar.open("An error has occurred. Tool/Equipment not edited: " + error);
        this.matDialogRef.close();
      });
  }
}
