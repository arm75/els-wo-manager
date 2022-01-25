import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { CustomerService } from "../../../core/services/customer.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Customer } from "../../../core/models/customer";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Customer";
  customerId: null;
  customerData!: Customer;
  editCustomerForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<CustomerEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private customerService: CustomerService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.dataLoaded = false;
    this.customerId = this.data.customerId;

    if (this.customerId != null) {
      this.customerService.get(this.customerId)
        .toPromise()
        .then(data => {
          this.customerData = data;
          this.editCustomerForm = this.formBuilder.group({
            'id': new FormControl(this.customerData.id),
            'emailAddr': new FormControl(this.customerData.emailAddr),
            'busAddress': new FormControl(this.customerData.busAddress),
            'busCity': new FormControl(this.customerData.busCity),
            'busState': new FormControl(this.customerData.busState),
            'busZipCode': new FormControl(this.customerData.busZipCode),
            'physAddress': new FormControl(this.customerData.physAddress),
            'physCity': new FormControl(this.customerData.physCity),
            'physState': new FormControl(this.customerData.physState),
            'physZipCode': new FormControl(this.customerData.physZipCode),
            'createdDate': new FormControl(this.customerData.createdDate),
            'updatedDate': new FormControl(this.customerData.updatedDate),
            'customerName': new FormControl(this.customerData.customerName),
            'phoneNumb': new FormControl(this.customerData.phoneNumb),
            'faxNumb': new FormControl(this.customerData.faxNumb),
          })
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  editCustomer() {
    this.customerService.update(this.editCustomerForm.value)
      .subscribe(data => {
        console.log("Customer " + this.editCustomerForm.value.id + " edited successfully.");
        this.matSnackBar.open("Customer " + this.editCustomerForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Customer not edited: " + error);
        this.matSnackBar.open("An error has occurred. Customer not edited: " + error);
        this.matDialogRef.close();
      });
  }

}
