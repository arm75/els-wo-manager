import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SubcontractorService } from "../../../core/services/subcontractor.service";
import { ElsWoManagerConstants } from "../../../core/els-wo-manager-constants";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-subcontractor-add',
  templateUrl: './subcontractor-add.component.html',
  styleUrls: ['./subcontractor-add.component.css']
})
export class SubcontractorAddComponent implements OnInit {

  formTitle: string = "Add Subcontractor";
  addForm: FormGroup = new FormGroup({});
  usStates = ElsWoManagerConstants.usStatesSelectArray;

  constructor( private matDialogRef: MatDialogRef<SubcontractorAddComponent>,
               private entityService: SubcontractorService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
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
        this.matDialogRef.close();
        this.globalSnackBarService.success("Subcontractor added successfully.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }
}
