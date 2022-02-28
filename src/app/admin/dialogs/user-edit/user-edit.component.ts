import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../../../core/services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../../../core/models/user";

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

  constructor( private matDialogRef: MatDialogRef<UserEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: UserService,
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
	          'username': new FormControl(this.entityData.username),
            'password': new FormControl(this.entityData.password),
            'retypePassword': new FormControl(this.entityData.password),
            'roles': new FormControl(this.entityData.roles),
            'authorities': new FormControl(this.entityData.authorities),
            'accountNonLocked': new FormControl(this.entityData.accountNonLocked),
            'active': new FormControl(this.entityData.active),
            'firstName': new FormControl(this.entityData.firstName),
            'lastName': new FormControl(this.entityData.lastName),
            'phoneNumb': new FormControl(this.entityData.phoneNumb),
            'altPhoneNumb': new FormControl(this.entityData.altPhoneNumb),
            'emailAddress': new FormControl(this.entityData.emailAddress)
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
        console.log("User " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("User " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. User not edited: " + error);
        this.matSnackBar.open("An error has occurred. User not edited: " + error);
        this.matDialogRef.close();
      });
  }

}

