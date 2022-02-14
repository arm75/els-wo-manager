import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { LocationService } from "../../../core/services/location.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {

  formTitle: string = "Add Location";

  addForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<LocationAddComponent>,
               private entityService: LocationService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      'entityName': new FormControl(''),
      'address': new FormControl(''),
      'unit': new FormControl(''),
      'city': new FormControl(''),
      'state': new FormControl(''),
      'zipCode': new FormControl(''),
      'phoneNumb': new FormControl(''),
      'altPhoneNumb': new FormControl(''),
      'emailAddress': new FormControl('')
    });
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
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
