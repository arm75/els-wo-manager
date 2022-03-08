import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { LocationService } from "../../../core/services/location.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Location } from "../../../core/models/location";
import {MatSelect} from "@angular/material/select";
import {CustomerService} from "../../../core/services/customer.service";
import {ElsWoManagerConstants} from "../../../core/els-wo-manager-constants";

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
  usStates = ElsWoManagerConstants.usStatesSelectArray;

  @ViewChild('customerSelect')
  customerSelect!: MatSelect;
  customerLoaded: any;
  customerSelected!: string;

  constructor( private matDialogRef: MatDialogRef<LocationEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: LocationService,
               private customerService: CustomerService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadCustomerSelect();
  }

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
            'customerId': new FormControl(this.entityData.customer.id, [Validators.required]),
            'entityName': new FormControl(this.entityData.entityName, [Validators.required])
          })
          this.customerSelected = this.entityData.customer.toString();
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  selectChange() {
    //console.log(this.selected);
    // alert("You selected" + this.selected);
  }

  loadCustomerSelect() {
    this.customerService.getAll().subscribe(
      data => {
        console.log(data);
        this.customerLoaded = data;
      },error => {
        console.log(error);
      }
    );
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
