import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { InventoryItemService } from "../../../core/services/inventory-item.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { InventoryItem } from "../../../core/models/inventory-item";
import { MatSelect } from "@angular/material/select";
import { InventoryService } from "../../../core/services/inventory.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-inventory-item-edit',
  templateUrl: './inventory-item-edit.component.html',
  styleUrls: ['./inventory-item-edit.component.css']
})
export class InventoryItemEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Inventory Item";
  woId: null;
  entityId: null;
  entityData!: InventoryItem;
  editForm: FormGroup = new FormGroup({});

  @ViewChild('inventorySelect')
  inventorySelect!: MatSelect;

  inventoryLoaded: any;
  inventorySelected!: string;
  inventorySelectedLoaded: any;

  constructor( private matDialogRef: MatDialogRef<InventoryItemEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryItemService,
               private inventoryService: InventoryService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadInventorySelect();
  }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.woId = this.data.woId;
    this.entityId = this.data.entityId;
    if (this.entityId != null) {
      this.entityService.get(this.entityId)
        .toPromise()
        .then(data => {
          this.entityData = data;
          this.editForm = this.formBuilder.group({
            'id': new FormControl(this.entityData.id),
            'inventoryId': new FormControl(this.entityData.inventoryId),
            'workOrderId': new FormControl(this.woId),
            'notes': new FormControl(this.entityData.notes),
            'unitPrice': new FormControl(this.entityData.unitPrice),
            'qty': new FormControl(this.entityData.qty),
          })
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  selectChange() {
    this.inventoryService.get(this.inventorySelected)
      .pipe(finalize(() => {
        this.editForm.controls['notes'].setValue(this.inventorySelectedLoaded.description);
        this.editForm.controls['unitPrice'].setValue(this.inventorySelectedLoaded.unitPrice);
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

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        console.log("Inventory Item " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("Inventory Item " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Inventory Item not edited: " + error);
        this.matSnackBar.open("An error has occurred. Inventory Item not edited: " + error);
        this.matDialogRef.close();
      });
  }
}
