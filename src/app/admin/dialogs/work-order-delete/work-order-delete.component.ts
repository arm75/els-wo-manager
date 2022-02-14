import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { WorkOrderService } from "../../../core/services/work-order.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { WorkOrder } from "../../../core/models/work-order";


@Component({
  selector: 'app-work-order-delete',
  templateUrl: './work-order-delete.component.html',
  styleUrls: ['./work-order-delete.component.css']
})
export class WorkOrderDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Work Order";
  entityId: null;
  entityData!: WorkOrder;

  constructor( private matDialogRef: MatDialogRef<WorkOrderDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: WorkOrderService,
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
        console.log("Work Order " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Work Order " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Work Order not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Work Order not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

