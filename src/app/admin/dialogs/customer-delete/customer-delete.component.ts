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
  entityId: null;
  entityData!: Customer;

  constructor( private matDialogRef: MatDialogRef<CustomerDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: CustomerService,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.dataLoaded = false;
    this.entityId = this.data.entityId;

    if (this.entityId != null) {
      this.entityService.get(this.entityId)
        .toPromise()
        .then(data => {
          this.entityData = data;
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  deleteEntity(): void {
    this.entityService.delete(this.entityId)
      .subscribe(data => {
        console.log("Customer " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Customer " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Customer not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Customer not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

