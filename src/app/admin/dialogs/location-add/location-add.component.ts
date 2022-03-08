import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { LocationService } from "../../../core/services/location.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSelect} from "@angular/material/select";
import { CustomerService} from "../../../core/services/customer.service";
import { ElsWoManagerConstants } from "../../../core/els-wo-manager-constants";


@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {

  formTitle: string = "Add Location";
  addForm: FormGroup = new FormGroup({});
  usStates = ElsWoManagerConstants.usStatesSelectArray;

  @ViewChild('customerSelect')
  customerSelect!: MatSelect;
  customerLoaded: any;
  customerSelected!: string;

  constructor( private matDialogRef: MatDialogRef<LocationAddComponent>,
               private entityService: LocationService,
               private customerService: CustomerService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadCustomerSelect();
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      'customerId': new FormControl('', [Validators.required]),
      'entityName': new FormControl('', [Validators.required])
    });
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

  addEntity() {
    // alert(this.addForm.value);
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
