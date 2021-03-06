import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { WorkOrderUsersService } from "../../../core/services/work-order-users.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { WorkOrder } from "../../../core/models/work-order";

@Component({
  selector: 'app-work-order-users-edit',
  templateUrl: './work-order-users-edit.component.html',
  styleUrls: ['./work-order-users-edit.component.css']
})
export class WorkOrderUsersEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Work Order Users";
  entityId: null;
  entityData!: WorkOrder;
  editForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<WorkOrderUsersEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: WorkOrderUsersService,
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
	    // 'entityName': new FormControl(this.entityData.entityName),
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
        console.log("Work Order Users " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("Work Order Users " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Work Order Users not edited: " + error);
        this.matSnackBar.open("An error has occurred. Work Order Users not edited: " + error);
        this.matDialogRef.close();
      });
  }

}

