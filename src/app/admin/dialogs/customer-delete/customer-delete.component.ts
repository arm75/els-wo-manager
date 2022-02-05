import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CustomerService } from "../../../core/services/customer.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Customer } from "../../../core/models/customer";


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

    if (this.customerId != null) {
      this.customerService.get(this.customerId)
        .toPromise()
        .then(data => {
          this.customerData = data;
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  deleteCustomer(): void {
    this.customerService.delete(this.customerId)
      .subscribe(data => {
        console.log("Customer " + this.customerId  + " deleted successfully.");
        this.matSnackBar.open("Customer " + this.customerId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Customer not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Customer not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}
