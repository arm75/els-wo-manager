import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { WorkOrderUsersService } from "../../../core/services/work-order-users.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { WorkOrder } from "../../../core/models/work-order";


@Component({
  selector: 'app-work-order-users-delete',
  templateUrl: './work-order-users-delete.component.html',
  styleUrls: ['./work-order-users-delete.component.css']
})
export class WorkOrderUsersDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Work Order Users";
  entityId: null;
  entityData!: WorkOrder;

  constructor( private matDialogRef: MatDialogRef<WorkOrderUsersDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: WorkOrderUsersService,
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
        console.log("Work Order Users " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Work Order Users " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Work Order Users not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Work Order Users not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

