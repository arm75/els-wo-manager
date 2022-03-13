import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { SubcontractorService } from "../../../core/services/subcontractor.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subcontractor } from "../../../core/models/subcontractor";
import { ElsWoManagerConstants } from "../../../core/els-wo-manager-constants";

@Component({
  selector: 'app-subcontractor-edit',
  templateUrl: './subcontractor-edit.component.html',
  styleUrls: ['./subcontractor-edit.component.css']
})
export class SubcontractorEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Subcontractor";
  entityId: null;
  entityData!: Subcontractor;
  editForm: FormGroup = new FormGroup({});
  usStates = ElsWoManagerConstants.usStatesSelectArray;

  constructor( private matDialogRef: MatDialogRef<SubcontractorEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: SubcontractorService,
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
            'entityName': new FormControl(this.entityData.entityName, [Validators.required]),
            'address': new FormControl(this.entityData.address, [Validators.required]),
            'unit': new FormControl(this.entityData.unit),
            'city': new FormControl(this.entityData.city, [Validators.required]),
            'state': new FormControl(this.entityData.state, [Validators.required]),
            'zipCode': new FormControl(this.entityData.zipCode, [Validators.required]),
            'phoneNumb': new FormControl(this.entityData.phoneNumb),
            'altPhoneNumb': new FormControl(this.entityData.altPhoneNumb),
            'emailAddress': new FormControl(this.entityData.emailAddress, [Validators.email])
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
        console.log("Subcontractor " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("Subcontractor " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Subcontractor not edited: " + error);
        this.matSnackBar.open("An error has occurred. Subcontractor not edited: " + error);
        this.matDialogRef.close();
      });
  }
}
