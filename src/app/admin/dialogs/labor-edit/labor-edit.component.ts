import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { LaborService } from "../../../core/services/labor.service";
import { Labor } from "../../../core/models/labor";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-labor-edit',
  templateUrl: './labor-edit.component.html',
  styleUrls: ['./labor-edit.component.css']
})
export class LaborEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Labor";
  entityId: null;
  entityData!: Labor;
  editForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<LaborEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: LaborService,
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
	          'ratePerHour': new FormControl(this.entityData.ratePerHour, [Validators.required])
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
        this.globalSnackBarService.success("Labor: " + this.editForm.value.id + " has been updated.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }
}
