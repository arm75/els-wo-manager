import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SubcontractorGroupService } from "../../../core/services/subcontractor-group.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SubcontractorGroup } from "../../../core/models/subcontractor-group";


@Component({
  selector: 'app-subcontractor-group-delete',
  templateUrl: './subcontractor-group-delete.component.html',
  styleUrls: ['./subcontractor-group-delete.component.css']
})
export class SubcontractorGroupDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Subcontractor Group";
  entityId: null;
  entityData!: SubcontractorGroup;

  constructor( private matDialogRef: MatDialogRef<SubcontractorGroupDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: SubcontractorGroupService,
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
        console.log("Subcontractor Group " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Subcontractor Group " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Subcontractor Group not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Subcontractor Group not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

