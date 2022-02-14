import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LocationService } from "../../../core/services/location.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Location } from "../../../core/models/location";


@Component({
  selector: 'app-location-delete',
  templateUrl: './location-delete.component.html',
  styleUrls: ['./location-delete.component.css']
})
export class LocationDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Location";
  entityId: null;
  entityData!: Location;

  constructor( private matDialogRef: MatDialogRef<LocationDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: LocationService,
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
        console.log("Location " + this.entityId  + " deleted successfully.");
        this.matSnackBar.open("Location " + this.entityId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Location not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Location not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}

