import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../../../core/services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  formTitle: string = "Add User";

  addForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<UserAddComponent>,
               private entityService: UserService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      'username': new FormControl(''),
      'password': new FormControl(''),
      'roles': new FormControl(''),
      'authorities': new FormControl(''),
      'accountNonLocked': new FormControl(''),
      'active': new FormControl(''),
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'phoneNumb': new FormControl(''),
      'altPhoneNumb': new FormControl(''),
      'emailAddress': new FormControl('')
    });

  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("User added successfully.");
        console.log("User added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. User not added: " + error);
        this.matSnackBar.open("An error has occurred. User not added: " + error);
        this.matDialogRef.close();
      });
  }

}

