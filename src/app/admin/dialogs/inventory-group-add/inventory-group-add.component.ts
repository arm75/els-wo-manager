import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-inventory-group-add',
  templateUrl: './inventory-group-add.component.html',
  styleUrls: ['./inventory-group-add.component.css']
})
export class InventoryGroupAddComponent implements OnInit {

  formTitle: string = "Add Inventory Group";

  addForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<InventoryGroupAddComponent>,
               private entityService: InventoryGroupService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
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
        this.matSnackBar.open("Inventory Group added successfully.");
        console.log("Inventory Group added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Inventory Group not added: " + error);
        this.matSnackBar.open("An error has occurred. Inventory Group not added: " + error);
        this.matDialogRef.close();
      });
  }
}
