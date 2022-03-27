import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToolEquipmentService } from "../../../core/services/tool-equipment.service";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-tool-equipment-add',
  templateUrl: './tool-equipment-add.component.html',
  styleUrls: ['./tool-equipment-add.component.css']
})
export class ToolEquipmentAddComponent implements OnInit {

  formTitle: string = "Add Tool/Equipment";
  addForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<ToolEquipmentAddComponent>,
               private entityService: ToolEquipmentService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      'entityName': new FormControl('', [Validators.required]),
      'description': new FormControl(''),
      'pricePerDay': new FormControl('', [Validators.required])
    });
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Tool/Equipment added successfully.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }
}
