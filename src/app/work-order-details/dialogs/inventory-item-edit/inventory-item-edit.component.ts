import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryItemService } from "../../../core/services/inventory-item.service";
import { InventoryItem } from "../../../core/models/inventory-item";
import { MatSelect } from "@angular/material/select";
import { InventoryService } from "../../../core/services/inventory.service";
import {finalize} from "rxjs/operators";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

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
  inventorySelected: any;
  inventorySelectedLoaded: any;

  constructor( private matDialogRef: MatDialogRef<InventoryItemEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryItemService,
               private inventoryService: InventoryService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

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
            'inventory': new FormControl(this.entityData.inventory, [Validators.required]),
            'workOrder': new FormControl(this.entityData.workOrder, [Validators.required]),
            'notes': new FormControl(this.entityData.notes),
            'unitPrice': new FormControl(this.entityData.unitPrice, [Validators.required]),
            'qty': new FormControl(this.entityData.qty, [Validators.required]),
          });
        })
        .catch(error => {
        })
        .finally(() => {
          this.dataLoaded = true;
          this.loadInventorySelect();
        }
      );
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.entityName === o2.entityName && o1.id === o2.id;
  }

  selectChange() {
    this.inventoryService.get(this.inventorySelected.id)
      .pipe(finalize(() => {
        this.editForm.controls['notes'].setValue(this.inventorySelectedLoaded.description);
        this.editForm.controls['unitPrice'].setValue(this.inventorySelectedLoaded.unitPrice);
      }))
      .subscribe(data => {
          this.inventorySelectedLoaded = data;
      },error => {
      }
    );
  }

  loadInventorySelect() {
    this.inventoryService.getAll().subscribe(
      data => {
        this.inventoryLoaded = data;
      },error => {
      }
    );
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Inventory Item: " + this.editForm.value.id + " has been updated.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      }
    );
  }

}
