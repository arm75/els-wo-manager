import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ToolEquipmentItemService } from "../../../core/services/tool-equipment-item.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSelect } from "@angular/material/select";
import { ToolEquipmentService } from "../../../core/services/tool-equipment.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-tool-equipment-item-add',
  templateUrl: './tool-equipment-item-add.component.html',
  styleUrls: ['./tool-equipment-item-add.component.css']
})
export class ToolEquipmentItemAddComponent implements OnInit {

  formTitle: string = "Add Tool/Equipment Item";
  woId: null;
  addForm: FormGroup = new FormGroup({});

  @ViewChild('toolEquipmentSelect')
  toolEquipmentSelect!: MatSelect;

  toolEquipmentLoaded: any;
  toolEquipmentSelected!: string;
  toolEquipmentSelectedLoaded: any;

  constructor( private matDialogRef: MatDialogRef<ToolEquipmentItemAddComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: ToolEquipmentItemService,
               private toolEquipmentService: ToolEquipmentService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadToolEquipmentSelect();
  }

  ngOnInit() {
    this.woId = this.data.woId;
    this.addForm = this.formBuilder.group({
      'toolEquipmentId': new FormControl(''),
      'workOrderId': new FormControl(this.woId),
      'notes': new FormControl(''),
      'pricePerDay': new FormControl(''),
      'days': new FormControl(''),
    });
  }

  selectChange() {
    this.toolEquipmentService.get(this.toolEquipmentSelected)
      .pipe(finalize(() => {
        this.addForm.controls['notes'].setValue(this.toolEquipmentSelectedLoaded.description);
        this.addForm.controls['pricePerDay'].setValue(this.toolEquipmentSelectedLoaded.pricePerDay);
      }))
      .subscribe(
        data => {
          this.toolEquipmentSelectedLoaded = data;
        }, error => {
          alert("there was an error");
        });
  }

  loadToolEquipmentSelect() {
    this.toolEquipmentService.getAll().subscribe(
      data => {
        console.log(data);
        this.toolEquipmentLoaded = data;
      },error => {
        console.log(error);
      }
    );
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Tool/Equipment Item added successfully.");
        console.log("Tool/Equipment Item added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Tool/Equipment Item not added: " + error);
        this.matSnackBar.open("An error has occurred. Tool/Equipment Item not added: " + error);
        this.matDialogRef.close();
      });
  }
}
