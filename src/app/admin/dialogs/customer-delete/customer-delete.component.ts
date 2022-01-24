import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CustomerService } from "../../../core/services/customer.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Customer } from "../../../core/models/customer";
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Customer";
  customerId: null;
  customerData!: Customer;

  constructor( private matDialogRef: MatDialogRef<CustomerDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private customerService: CustomerService,
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

          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });

      console.log('After form assignments');
    }


  }

  deleteCustomer(): void {
    console.log("Delete Customer Method");
    this.customerService.delete(this.customerId)
      .subscribe(data => {
        this.matSnackBar.open("Customer deleted successfully.")
        console.log("Customer deleted successfully.");
        this.matDialogRef.close();
        console.log("Now refresh table?");
      }, error => {
        this.matSnackBar.open("An error has occurred. Customer not deleted.")
        console.log(error);
        this.matDialogRef.close();
      });
  }

}
