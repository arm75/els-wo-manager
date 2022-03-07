import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { WorkOrderUsersService } from "../../../core/services/work-order-users.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-work-order-users-add',
  templateUrl: './work-order-users-add.component.html',
  styleUrls: ['./work-order-users-add.component.css']
})
export class WorkOrderUsersAddComponent implements OnInit {

  formTitle: string = "Add Work Order Users";

  addForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<WorkOrderUsersAddComponent>,
               private entityService: WorkOrderUsersService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      'entityName': new FormControl(''),
      // 'physAddress': new FormControl(''),
      // 'physUnit': new FormControl(''),
      // 'physCity': new FormControl(''),
      // 'physState': new FormControl(''),
      // 'physZipCode': new FormControl(''),
      // 'billAddress': new FormControl(''),
      // 'billUnit': new FormControl(''),
      // 'billCity': new FormControl(''),
      // 'billState': new FormControl(''),
      // 'billZipCode': new FormControl(''),
      // 'phoneNumb': new FormControl(''),
      // 'altPhoneNumb': new FormControl(''),
      // 'emailAddress': new FormControl(''),
    });

  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Work Order Users added successfully.");
        console.log("Work Order Users added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Work Order Users not added: " + error);
        this.matSnackBar.open("An error has occurred. Work Order Users not added: " + error);
        this.matDialogRef.close();
      });
  }

}

