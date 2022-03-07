import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ToolEquipmentReturnService } from "../../../core/services/tool-equipment-return.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ToolEquipment } from "../../../core/models/tool-equipment";

@Component({
  selector: 'app-tool-equipment-return-edit',
  templateUrl: './tool-equipment-return-edit.component.html',
  styleUrls: ['./tool-equipment-return-edit.component.css']
})
export class ToolEquipmentReturnEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Tool/Equipment Return";
  entityId: null;
  entityData!: ToolEquipment;
  editForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<ToolEquipmentReturnEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: ToolEquipmentReturnService,
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
	    // 'physAddress': new FormControl(this.entityData.physAddress),
	    // 'physUnit': new FormControl(this.entityData.physUnit),
	    // 'physCity': new FormControl(this.entityData.physCity),
	    // 'physState': new FormControl(this.entityData.physState),
	    // 'physZipCode': new FormControl(this.entityData.physZipCode),
	    // 'billAddress': new FormControl(this.entityData.billAddress),
	    // 'billUnit': new FormControl(this.entityData.billUnit),
	    // 'billCity': new FormControl(this.entityData.billCity),
	    // 'billState': new FormControl(this.entityData.billState),
	    // 'billZipCode': new FormControl(this.entityData.billZipCode),
	    // 'phoneNumb': new FormControl(this.entityData.phoneNumb),
	    // 'altPhoneNumb': new FormControl(this.entityData.altPhoneNumb),
	    // 'emailAddress': new FormControl(this.entityData.emailAddress),
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
        console.log("Tool/Equipment Return " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("Tool/Equipment Return " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Tool/Equipment Return not edited: " + error);
        this.matSnackBar.open("An error has occurred. Tool/Equipment Return not edited: " + error);
        this.matDialogRef.close();
      });
  }

}

