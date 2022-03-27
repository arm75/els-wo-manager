import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CustomerService } from "../../../core/services/customer.service";
import { Customer } from "../../../core/models/customer";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

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
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.entityId = this.data.entityId;
    if (this.entityId != null) {
      this.entityService.get(this.entityId)
        .toPromise()
        .then(data => {
          this.entityData = data;
        })
        .catch(error => {
        })
        .finally( () => {
          this.dataLoaded = true;
        }
      );
    }
  }

  deleteEntity(): void {
    this.entityService.delete(this.entityId)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Customer: " + this.entityId  + " has been deleted.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }

}
