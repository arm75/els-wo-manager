import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryLocationService } from "../../../core/services/inventory-location.service";
import { InventoryLocation } from "../../../core/models/inventory-location";
import { ElsWoManagerConstants } from "../../../core/els-wo-manager-constants";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-inventory-location-edit',
  templateUrl: './inventory-location-edit.component.html',
  styleUrls: ['./inventory-location-edit.component.css']
})
export class InventoryLocationEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Inventory Location";
  entityId: null;
  entityData!: InventoryLocation;
  editForm: FormGroup = new FormGroup({});
  usStates = ElsWoManagerConstants.usStatesSelectArray;

  constructor( private matDialogRef: MatDialogRef<InventoryLocationEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryLocationService,
               private formBuilder: FormBuilder,
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
          this.editForm = this.formBuilder.group({
            'id': new FormControl(this.entityData.id),
	          'entityName': new FormControl(this.entityData.entityName, [Validators.required]),
	          'address': new FormControl(this.entityData.address, [Validators.required]),
	          'unit': new FormControl(this.entityData.unit),
	          'city': new FormControl(this.entityData.city, [Validators.required]),
	          'state': new FormControl(this.entityData.state, [Validators.required]),
	          'zipCode': new FormControl(this.entityData.zipCode, [Validators.required]),
	          'phoneNumb': new FormControl(this.entityData.phoneNumb),
	          'altPhoneNumb': new FormControl(this.entityData.altPhoneNumb)
          });
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
        this.matDialogRef.close();
        this.globalSnackBarService.success("Inventory Location: " + this.editForm.value.id + " has been updated.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }

}
