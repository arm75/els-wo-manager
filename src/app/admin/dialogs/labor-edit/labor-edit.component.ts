import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { LaborService } from "../../../core/services/labor.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Labor } from "../../../core/models/labor";

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
	          'ratePerHour': new FormControl(this.entityData.ratePerHour)
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
        console.log("Labor " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("Labor " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Labor not edited: " + error);
        this.matSnackBar.open("An error has occurred. Labor not edited: " + error);
        this.matDialogRef.close();
      });
  }
}
