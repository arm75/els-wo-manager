import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LocationService } from "../../../core/services/location.service";
import { Location } from "../../../core/models/location";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

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
        this.globalSnackBarService.success("Location " + this.entityId  + " deleted successfully.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }

}
