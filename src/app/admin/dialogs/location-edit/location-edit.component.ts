import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { LocationService } from "../../../core/services/location.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Location } from "../../../core/models/location";

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Location";
  entityId: null;
  entityData!: Location;
  editForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<LocationEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: LocationService,
               private formBuilder: FormBuilder,
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
          this.editForm = this.formBuilder.group({
            'id': new FormControl(this.entityData.id),
            'entityName': new FormControl(this.entityData.entityName),
            'address': new FormControl(this.entityData.address),
            'unit': new FormControl(this.entityData.unit),
            'city': new FormControl(this.entityData.city),
            'state': new FormControl(this.entityData.state),
            'zipCode': new FormControl(this.entityData.zipCode),
            'phoneNumb': new FormControl(this.entityData.phoneNumb),
            'altPhoneNumb': new FormControl(this.entityData.altPhoneNumb),
            'emailAddress': new FormControl(this.entityData.emailAddress)
          })
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        console.log("Location " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("Location " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Location not edited: " + error);
        this.matSnackBar.open("An error has occurred. Location not edited: " + error);
        this.matDialogRef.close();
      });
  }
}
