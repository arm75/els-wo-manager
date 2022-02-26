import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SubcontractorItemService } from "../../../core/services/subcontractor-item.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SubcontractorItem } from "../../../core/models/subcontractor-item";


@Component({
  selector: 'app-subcontractor-item-delete',
  templateUrl: './subcontractor-item-delete.component.html',
  styleUrls: ['./subcontractor-item-delete.component.css']
})
export class SubcontractorItemDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Subcontractor Item";
  entityId: null;
  entityData!: SubcontractorItem;

  constructor( private matDialogRef: MatDialogRef<SubcontractorItemDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: SubcontractorItemService,
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
        console.log("Subcontractor Item " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Subcontractor Item " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Subcontractor Item not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Subcontractor Item not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

