import { Component, Inject, OnInit } from '@angular/core';
import { Location } from "../../../core/models/location";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LocationService } from "../../../core/services/location.service";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-location-delete',
  templateUrl: './location-delete.component.html',
  styleUrls: ['./location-delete.component.css']
})
export class LocationDeleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Delete Location";
  locationId: null;
  locationData!: Location;

  constructor( private matDialogRef: MatDialogRef<LocationDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private locationService: LocationService,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.dataLoaded = false;
    this.locationId = this.data.locationId;

    if (this.locationId != null) {
      this.locationService.get(this.locationId)
        .toPromise()
        .then(data => {
          this.locationData = data;
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  deleteLocation(): void {
    this.locationService.delete(this.locationId)
      .subscribe(data => {
        console.log("Location " + this.locationId  + " deleted successfully.");
        this.matSnackBar.open("Location " + this.locationId  + " deleted successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Location not deleted: " + error);
        this.matSnackBar.open("An error has occurred. Location not deleted: " + error);
        this.matDialogRef.close();
      });
  }

}
