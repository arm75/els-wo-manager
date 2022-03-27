import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { UserService } from "../../../core/services/user.service";
import { User } from "../../../core/models/user";
import {ElsWoManagerConstants} from "../../../core/els-wo-manager-constants";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit User";
  entityId: null;
  entityData!: User;
  editForm: FormGroup = new FormGroup({});

  userRoles = ElsWoManagerConstants.userRolesSelectArray;
  roleSelected: any;

  constructor( private matDialogRef: MatDialogRef<UserEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: UserService,
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
            'firstName': new FormControl(this.entityData.firstName, [Validators.required]),
            'lastName': new FormControl(this.entityData.lastName, [Validators.required]),
            'username': new FormControl(this.entityData.username, [Validators.required]),
            'password': new FormControl(this.entityData.password, [Validators.required]),
            'retypePassword': new FormControl(this.entityData.password, [Validators.required]),
            'role': new FormControl(this.entityData.role, [Validators.required]),
            // 'authorities': new FormControl(this.entityData.authorities),
            'accountNonLocked': new FormControl(this.entityData.accountNonLocked),
            'active': new FormControl(this.entityData.active),
            'phoneNumb': new FormControl(this.entityData.phoneNumb),
            'altPhoneNumb': new FormControl(this.entityData.altPhoneNumb),
            'emailAddress': new FormControl(this.entityData.emailAddress, [Validators.email])
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
        this.globalSnackBarService.success("User: " + this.editForm.value.id + " has been updated.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }

}

