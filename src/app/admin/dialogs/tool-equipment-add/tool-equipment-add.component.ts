import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ToolEquipmentService } from "../../../core/services/tool-equipment.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      'entityName': new FormControl(''),
      'description': new FormControl(''),
      'pricePerDay': new FormControl('')
    });
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Tool/Equipment added successfully.");
        console.log("Tool/Equipment added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Tool/Equipment not added: " + error);
        this.matSnackBar.open("An error has occurred. Tool/Equipment not added: " + error);
        this.matDialogRef.close();
      });
  }
}
