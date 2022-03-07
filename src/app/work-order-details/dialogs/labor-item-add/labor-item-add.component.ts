import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { LaborItemService } from "../../../core/services/labor-item.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSelect } from "@angular/material/select";
import { LaborService } from "../../../core/services/labor.service";
import { ElsWoManagerConstants } from "../../../core/els-wo-manager-constants";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-labor-item-add',
  templateUrl: './labor-item-add.component.html',
  styleUrls: ['./labor-item-add.component.css']
})
export class LaborItemAddComponent implements OnInit {

  formTitle: string = "Add Labor Item";
  woId: null;
  addForm: FormGroup = new FormGroup({});
  hours = ElsWoManagerConstants.hoursSelectArray;
  minutes = ElsWoManagerConstants.minutesSelectArray;

  @ViewChild('laborSelect')
  laborSelect!: MatSelect;

  laborLoaded: any;
  laborSelected!: string;
  laborSelectedLoaded: any;

  constructor( private matDialogRef: MatDialogRef<LaborItemAddComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: LaborItemService,
               private laborService: LaborService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadLaborSelect();
  }

  ngOnInit() {
    this.woId = this.data.woId;
    this.addForm = this.formBuilder.group({
      'laborId': new FormControl(''),
      'workOrderId': new FormControl(this.woId),
      'notes': new FormControl(''),
      'ratePerHour': new FormControl(''),
      'hours': new FormControl(''),
      'minutes': new FormControl(''),
      'total': new FormControl(''),
    });
  }

  selectChange() {
    this.laborService.get(this.laborSelected)
      .pipe(finalize(() => {
        this.addForm.controls['notes'].setValue(this.laborSelectedLoaded.description);
        this.addForm.controls['ratePerHour'].setValue(this.laborSelectedLoaded.ratePerHour);
      }))
      .subscribe(
        data => {
          this.laborSelectedLoaded = data;
        }, error => {
          alert("there was an error");
        });
  }

  loadLaborSelect() {
    this.laborService.getAll().subscribe(
      data => {
        console.log(data);
        this.laborLoaded = data;
      },error => {
        console.log(error);
      }
    );
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Labor Item added successfully.");
        console.log("Labor Item added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Labor Item not added: " + error);
        this.matSnackBar.open("An error has occurred. Labor Item not added: " + error);
        this.matDialogRef.close();
      });
  }
}
