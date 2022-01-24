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
    console.log('Before the if statement');

    if (this.customerId != null) {

      console.log('Inside the if statement');

      this.customerService.get(this.customerId)
        .toPromise()
        .then(data => {
          this.customerData = data;
          // console.log('data var: ' + data.customerName);
          // Object.assign(this.customerData, data);
          //
          console.log('data: ');
          console.log(this.customerData);
          console.log('Before form assignments');
          //
          // console.log(this.customerData)
          // this.editCustomerForm = this.formBuilder.group({
          //   emailAddr: new FormControl(data.emailAddr),
          //   busAddress: new FormControl(data.busAddress),
          //   busCity: new FormControl(data.busCity),
          //   busState: new FormControl(data.busState),
          //   customerName: new FormControl(data.customerName),
          //   phoneNumb: new FormControl(data.phoneNumb),
          //   faxNumb: new FormControl(data.faxNumb),
          //   busZipCode: new FormControl(data.busZipCode),
          //   physAddress: new FormControl(data.physAddress),
          //   physCity: new FormControl(data.physCity),
          //   physState: new FormControl(data.physState),
          //   physZipCode: new FormControl(data.physZipCode),
          //   createdDate: new FormControl(data.createdDate),
          //   updatedDate: new FormControl(data.updatedDate),
          // });
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

        console.log('After form assignments');
    }
  }

  editCustomer() {
    console.log('Edit clicked');
    console.log("From Log Again: ");
    console.log(this.editCustomerForm.value);

    this.customerService.update(this.editCustomerForm.value)
      .subscribe(data => {
         this.matSnackBar.open("Customer edited successfully.")
         console.log("Customer edited successfully.");
         this.matDialogRef.close();
       }, error => {
         this.matSnackBar.open("An error has occurred. Customer not edited.")
         console.log(error);
         this.matDialogRef.close();
       });
  }

}
