import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryLocationService } from "../../../core/services/inventory-location.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ElsWoManagerConstants } from "../../../core/els-wo-manager-constants";

@Component({
  selector: 'app-inventory-location-add',
  templateUrl: './inventory-location-add.component.html',
  styleUrls: ['./inventory-location-add.component.css']
})
export class InventoryLocationAddComponent implements OnInit {

  formTitle: string = "Add Inventory Location";
  addForm: FormGroup = new FormGroup({});
  usStates = ElsWoManagerConstants.usStatesSelectArray;

  constructor( private matDialogRef: MatDialogRef<InventoryLocationAddComponent>,
               private entityService: InventoryLocationService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      'entityName': new FormControl('', [Validators.required]),
      'address': new FormControl('', [Validators.required]),
      'unit': new FormControl(''),
      'city': new FormControl('', [Validators.required]),
      'state': new FormControl('', [Validators.required]),
      'zipCode': new FormControl('', [Validators.required]),
      'phoneNumb': new FormControl(''),
      'altPhoneNumb': new FormControl(''),
      'emailAddress': new FormControl('', [Validators.email])
    });
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Inventory Location added successfully.");
        console.log("Inventory Location added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Inventory Location not added: " + error);
        this.matSnackBar.open("An error has occurred. Inventory Location not added: " + error);
        this.matDialogRef.close();
      });
  }
}
