import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { SubcontractorGroupService } from "../../../core/services/subcontractor-group.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-subcontractor-group-add',
  templateUrl: './subcontractor-group-add.component.html',
  styleUrls: ['./subcontractor-group-add.component.css']
})
export class SubcontractorGroupAddComponent implements OnInit {

  formTitle: string = "Add Subcontractor Group";

  addForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<SubcontractorGroupAddComponent>,
               private entityService: SubcontractorGroupService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      'entityName': new FormControl('', [Validators.required]),
      'description': new FormControl('')
    });

  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Subcontractor Group added successfully.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }

}

