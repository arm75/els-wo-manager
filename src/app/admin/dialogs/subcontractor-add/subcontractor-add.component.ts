import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { SubcontractorService } from "../../../core/services/subcontractor.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-subcontractor-add',
  templateUrl: './subcontractor-add.component.html',
  styleUrls: ['./subcontractor-add.component.css']
})
export class SubcontractorAddComponent implements OnInit {

  formTitle: string = "Add Subcontractor";

  addForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<SubcontractorAddComponent>,
               private entityService: SubcontractorService,
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
        this.matSnackBar.open("Subcontractor added successfully.");
        console.log("Subcontractor added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Subcontractor not added: " + error);
        this.matSnackBar.open("An error has occurred. Subcontractor not added: " + error);
        this.matDialogRef.close();
      });
  }
}
