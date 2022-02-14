import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { InventoryService } from "../../../core/services/inventory.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']
})
export class InventoryAddComponent implements OnInit {

  formTitle: string = "Add Inventory";

  addForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<InventoryAddComponent>,
               private entityService: InventoryService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      'entityName': new FormControl(''),
      'description': new FormControl(''),
      'unitCost': new FormControl(''),
      'unitPrice': new FormControl(''),
      'qtyInStock': new FormControl(''),
      'taxable': new FormControl(''),
      'taxRateId': new FormControl('')
    });
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Inventory added successfully.");
        console.log("Inventory added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Inventory not added: " + error);
        this.matSnackBar.open("An error has occurred. Inventory not added: " + error);
        this.matDialogRef.close();
      });
  }
}
