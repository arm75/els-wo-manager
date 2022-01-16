import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { CustomerService } from "../../../core/services/customer.service";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  formTitle: string = "Add Customer";
  addCustomerForm: FormGroup = new FormGroup({});

  constructor(private customerService: CustomerService,
              private formBuilder: FormBuilder,
              private matDialogRef: MatDialogRef<CustomerAddComponent>) {
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
    })
  }

  ngOnInit() { }

  addCustomer() {
    console.log(this.addCustomerForm.value);
    this.customerService.create(this.addCustomerForm.value)
      .subscribe(data => {
        console.log("Customer Created");
      }, error => {
        console.log(error);
      });
    this.matDialogRef.close();
  }

  closeMatDialog() {
    this.matDialogRef.close();
  }

}
