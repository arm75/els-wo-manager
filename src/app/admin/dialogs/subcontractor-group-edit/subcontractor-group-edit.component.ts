import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { SubcontractorGroupService } from "../../../core/services/subcontractor-group.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SubcontractorGroup } from "../../../core/models/subcontractor-group";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-subcontractor-group-edit',
  templateUrl: './subcontractor-group-edit.component.html',
  styleUrls: ['./subcontractor-group-edit.component.css']
})
export class SubcontractorGroupEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Subcontractor Group";
  entityId: null;
  entityData!: SubcontractorGroup;
  editForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<SubcontractorGroupEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: SubcontractorGroupService,
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
            'description': new FormControl(this.entityData.description)
          });
        })
        .catch(error => {
        })
        .finally(()=>{
          this.dataLoaded = true;
        });
    }
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Subcontractor Group: " + this.editForm.value.id + " has been updated.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }

}

