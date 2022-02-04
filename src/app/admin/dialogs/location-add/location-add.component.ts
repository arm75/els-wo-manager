import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LocationService } from "../../../core/services/location.service";

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {

  formTitle: string = "Add Location";

  addLocationForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<LocationAddComponent>,
               private locationService: LocationService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.addLocationForm = this.formBuilder.group({
      'locationName': new FormControl(''),
      'customerId': new FormControl(''),
      'bAddress': new FormControl(''),
      'bCity': new FormControl(''),
      'bState': new FormControl(''),
      'bZipCode': new FormControl(''),
      'pAddress': new FormControl(''),
      'pCity': new FormControl(''),
      'pState': new FormControl(''),
      'pZipCode': new FormControl(''),
      'phoneNumb': new FormControl(''),
      'faxNumb': new FormControl(''),
      'emailAddr': new FormControl(''),
      'createdDate': new FormControl(''),
      'updatedDate': new FormControl('')
    });

  }

  addLocation() {
    this.locationService.create(this.addLocationForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Location added successfully.");
        console.log("Location added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Location not added: " + error);
        this.matSnackBar.open("An error has occurred. Location not added: " + error);
        this.matDialogRef.close();
      });
  }

}
