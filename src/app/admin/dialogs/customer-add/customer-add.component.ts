import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { CustomerService } from "../../../core/services/customer.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ElsWoManagerConstants } from "../../../core/els-wo-manager-constants";
//import {GlobalFormErrorStateMatcher} from "../../../shared/form-error/global-form-error-state-matcher";


@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  formTitle: string = "Add Customer";
  addForm: FormGroup = new FormGroup({});
  usStates = ElsWoManagerConstants.usStatesSelectArray;
  //matcher = new GlobalFormErrorStateMatcher();

  constructor( private matDialogRef: MatDialogRef<CustomerAddComponent>,
               private entityService: CustomerService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar,
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

    this.addForm.controls['emailAddress']

    // this.editForm.controls['inventoryItemsTotal'].setValue(this.masterInventoryTotal);

  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Customer added successfully.");
        console.log("Customer added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Customer not added: " + error);
        this.matSnackBar.open("An error has occurred. Customer not added: " + error);
        this.matDialogRef.close();
      });
  }
}
