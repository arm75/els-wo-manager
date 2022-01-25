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
  addCustomerForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<CustomerAddComponent>,
               private customerService: CustomerService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.addCustomerForm = this.formBuilder.group({
      'busAddress': new FormControl(''),
      'busCity': new FormControl(''),
      'busState': new FormControl(''),
      'busZipCode': new FormControl(''),
      'createdDate': new FormControl(''),
      'customerName': new FormControl(''),
      'emailAddr': new FormControl(''),
      'faxNumb': new FormControl(''),
      'phoneNumb': new FormControl(''),
      'physAddress': new FormControl(''),
      'physCity': new FormControl(''),
      'physState': new FormControl(''),
      'physZipCode': new FormControl(''),
      'updatedDate': new FormControl(''),
    });

  }

  addCustomer() {
    this.customerService.create(this.addCustomerForm.value)
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
