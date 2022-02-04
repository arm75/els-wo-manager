import { Component, Inject, OnInit } from '@angular/core';
import { Location } from "../../../core/models/location";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LocationService } from "../../../core/services/location.service";

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Location";
  locationId: null;
  locationData!: Location;
  editLocationForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<LocationEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private locationService: LocationService,
               private formBuilder: FormBuilder,
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
          this.editLocationForm = this.formBuilder.group({
            'id': new FormControl(this.locationData.id),
            'locationName': new FormControl(this.locationData.locationName),
            //'customerId': new FormControl(this.customerData.),
            'address': new FormControl(this.locationData.address),
            'city': new FormControl(this.locationData.city),
            'state': new FormControl(this.locationData.state),
            'zipCode': new FormControl(this.locationData.zipCode),
            'phoneNumb': new FormControl(this.locationData.phoneNumb),
            'faxNumb': new FormControl(this.locationData.faxNumb),
            'emailAddr': new FormControl(this.locationData.emailAddr),
            'createdDate': new FormControl(this.locationData.createdDate),
            'updatedDate': new FormControl(this.locationData.updatedDate)
          })
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  editLocation() {
    this.locationService.update(this.editLocationForm.value)
      .subscribe(data => {
        console.log("Location " + this.editLocationForm.value.id + " edited successfully.");
        this.matSnackBar.open("Location " + this.editLocationForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Location not edited: " + error);
        this.matSnackBar.open("An error has occurred. Location not edited: " + error);
        this.matDialogRef.close();
      });
  }

}
