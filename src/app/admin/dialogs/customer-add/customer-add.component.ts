import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { CustomerService } from "../../../core/services/customer.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  formTitle: string = "Add Customer";

  addForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<CustomerAddComponent>,
               private entityService: CustomerService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      'entityName': new FormControl(''),
      'physAddress': new FormControl(''),
      'physUnit': new FormControl(''),
      'physCity': new FormControl(''),
      'physState': new FormControl(''),
      'physZipCode': new FormControl(''),
      'billAddress': new FormControl(''),
      'billUnit': new FormControl(''),
      'billCity': new FormControl(''),
      'billState': new FormControl(''),
      'billZipCode': new FormControl(''),
      'phoneNumb': new FormControl(''),
      'altPhoneNumb': new FormControl(''),
      'emailAddress': new FormControl('')
    });
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Customer added successfully.");
        console.log("Customer added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Customer not added: " + error);
        this.matSnackBar.open("An error has occurred. Customer not added: " + error);
        this.matDialogRef.close();
      });
  }
}
