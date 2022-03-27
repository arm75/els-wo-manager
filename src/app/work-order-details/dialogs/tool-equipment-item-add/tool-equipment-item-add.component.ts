import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ToolEquipmentItemService } from "../../../core/services/tool-equipment-item.service";
import { MatSelect } from "@angular/material/select";
import { ToolEquipmentService } from "../../../core/services/tool-equipment.service";
import {finalize} from "rxjs/operators";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

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
  toolEquipmentSelected: any;
  toolEquipmentSelectedLoaded: any;

  constructor( private matDialogRef: MatDialogRef<ToolEquipmentItemAddComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: ToolEquipmentItemService,
               private toolEquipmentService: ToolEquipmentService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit() {
    this.woId = this.data.woId;
    this.addForm = this.formBuilder.group({
      'toolEquipment': new FormControl('', [Validators.required]),
      'workOrder': new FormControl({ "id": this.woId }),
      'notes': new FormControl(''),
      'pricePerDay': new FormControl('', [Validators.required]),
      'days': new FormControl('', [Validators.required]),
      'total': new FormControl('')
    });
    this.loadToolEquipmentSelect();
  }

  selectChange() {
    this.toolEquipmentService.get(this.toolEquipmentSelected.id)
      .pipe(finalize(() => {
        this.addForm.controls['notes'].setValue(this.toolEquipmentSelectedLoaded.description);
        this.addForm.controls['pricePerDay'].setValue(this.toolEquipmentSelectedLoaded.pricePerDay);
      }))
      .subscribe(data => {
          this.toolEquipmentSelectedLoaded = data;
      }, error => {
      }
    );
  }

  loadToolEquipmentSelect() {
    this.toolEquipmentService.getAll().subscribe(data => {
      this.toolEquipmentLoaded = data;
      },error => {
      }
    );
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Tool/Equipment Item added successfully.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      }
    );
  }

}
