import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryItemService } from "../../../core/services/inventory-item.service";
import { MatSelect } from "@angular/material/select";
import { InventoryService } from "../../../core/services/inventory.service";
import {finalize} from "rxjs/operators";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

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
  inventorySelected: any;
  inventorySelectedLoaded: any;

  constructor( private matDialogRef: MatDialogRef<InventoryItemAddComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryItemService,
               private inventoryService: InventoryService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit() {
    this.woId = this.data.woId;
    this.addForm = this.formBuilder.group({
      'inventory': new FormControl('', [Validators.required]),
      'workOrder': new FormControl({ "id": this.woId}),
      'notes': new FormControl(''),
      'unitPrice': new FormControl('', [Validators.required]),
      'qty': new FormControl('', [Validators.required]),
      'total': new FormControl('')
    });
    this.loadInventorySelect();
  }

  selectChange() {
    this.inventoryService.get(this.inventorySelected.id)
      .pipe(finalize(() => {
          this.addForm.controls['notes'].setValue(this.inventorySelectedLoaded.description);
          this.addForm.controls['unitPrice'].setValue(this.inventorySelectedLoaded.unitPrice);
      })).subscribe(data => {
        this.inventorySelectedLoaded = data;
      }, error => {
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

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Inventory Item added successfully.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }

}
