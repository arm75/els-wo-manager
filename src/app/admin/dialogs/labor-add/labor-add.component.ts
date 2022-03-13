import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { LaborService } from "../../../core/services/labor.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-labor-add',
  templateUrl: './labor-add.component.html',
  styleUrls: ['./labor-add.component.css']
})
export class LaborAddComponent implements OnInit {

  formTitle: string = "Add Labor";

  addForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<LaborAddComponent>,
               private entityService: LaborService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      'entityName': new FormControl('', [Validators.required]),
      'description': new FormControl(''),
      'ratePerHour': new FormControl('', [Validators.required])
    });
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Labor added successfully.");
        console.log("Labor added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Labor not added: " + error);
        this.matSnackBar.open("An error has occurred. Labor not added: " + error);
        this.matDialogRef.close();
      });
  }
}
