import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { InventoryItemService } from "../../../core/services/inventory-item.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSelect } from "@angular/material/select";
import { InventoryService } from "../../../core/services/inventory.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-inventory-item-add',
  templateUrl: './inventory-item-add.component.html',
  styleUrls: ['./inventory-item-add.component.css']
})
export class InventoryItemAddComponent implements OnInit {

  formTitle: string = "Add Inventory Item";
  woId: null;
  addForm: FormGroup = new FormGroup({});

  @ViewChild('inventorySelect')
  inventorySelect!: MatSelect;

  inventoryLoaded: any;
  inventorySelected!: string;
  inventorySelectedLoaded: any;

  constructor( private matDialogRef: MatDialogRef<InventoryItemAddComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryItemService,
               private inventoryService: InventoryService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadInventorySelect();
  }

  ngOnInit() {
    this.woId = this.data.woId;
    this.addForm = this.formBuilder.group({
      'inventoryId': new FormControl(''),
      'workOrderId': new FormControl(this.woId),
      'notes': new FormControl(''),
      'unitPrice': new FormControl(''),
      'qty': new FormControl(''),
    });
  }

  selectChange() {
    this.inventoryService.get(this.inventorySelected)
      .pipe(finalize(() => {
          this.addForm.controls['notes'].setValue(this.inventorySelectedLoaded.description);
          this.addForm.controls['unitPrice'].setValue(this.inventorySelectedLoaded.unitPrice);
      }))
      .subscribe(
      data => {
        this.inventorySelectedLoaded = data;
      }, error => {
        alert("there was an error");
      });
  }

  loadInventorySelect() {
    this.inventoryService.getAll().subscribe(
      data => {
        console.log(data);
        this.inventoryLoaded = data;
      },error => {
        console.log(error);
      }
    );
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Inventory Item added successfully.");
        console.log("Inventory Item added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Inventory Item not added: " + error);
        this.matSnackBar.open("An error has occurred. Inventory Item not added: " + error);
        this.matDialogRef.close();
      });
  }
}
