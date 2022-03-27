import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { UserService } from "../../../core/services/user.service";
import {ElsWoManagerConstants} from "../../../core/els-wo-manager-constants";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  formTitle: string = "Add User";

  addForm: FormGroup = new FormGroup({});

  userRoles = ElsWoManagerConstants.userRolesSelectArray;
  roleSelected: any;


  constructor( private matDialogRef: MatDialogRef<UserAddComponent>,
               private entityService: UserService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'retypePassword': new FormControl('', [Validators.required]),
      'role': new FormControl('', [Validators.required]),
      //'authorities': new FormControl(''),
      'accountNonLocked': new FormControl(''),
      'active': new FormControl(''),
      'phoneNumb': new FormControl(''),
      'altPhoneNumb': new FormControl(''),
      'emailAddress': new FormControl('', [Validators.email])
    });
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.globalSnackBarService.success("User added successfully.");
        this.matDialogRef.close();
      }, error => {
        this.globalSnackBarService.error(error.error.message);
        this.matDialogRef.close();
      });
  }

}

