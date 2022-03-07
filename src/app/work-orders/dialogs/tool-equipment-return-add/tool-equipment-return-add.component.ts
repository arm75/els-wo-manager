import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ToolEquipmentReturnService } from "../../../core/services/tool-equipment-return.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-tool-equipment-return-add',
  templateUrl: './tool-equipment-return-add.component.html',
  styleUrls: ['./tool-equipment-return-add.component.css']
})
export class ToolEquipmentReturnAddComponent implements OnInit {

  formTitle: string = "Add Tool/Equipment Return";

  addForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<ToolEquipmentReturnAddComponent>,
               private entityService: ToolEquipmentReturnService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      // 'entityName': new FormControl(''),
      // 'physAddress': new FormControl(''),
      // 'physUnit': new FormControl(''),
      // 'physCity': new FormControl(''),
      // 'physState': new FormControl(''),
      // 'physZipCode': new FormControl(''),
      // 'billAddress': new FormControl(''),
      // 'billUnit': new FormControl(''),
      // 'billCity': new FormControl(''),
      // 'billState': new FormControl(''),
      // 'billZipCode': new FormControl(''),
      // 'phoneNumb': new FormControl(''),
      // 'altPhoneNumb': new FormControl(''),
      // 'emailAddress': new FormControl(''),
    });

  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Tool/Equipment Return added successfully.");
        console.log("Tool/Equipment Return added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Tool/Equipment Return not added: " + error);
        this.matSnackBar.open("An error has occurred. Tool/Equipment Return not added: " + error);
        this.matDialogRef.close();
      });
  }

}

