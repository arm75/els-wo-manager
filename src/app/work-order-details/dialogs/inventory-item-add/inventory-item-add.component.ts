import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryItemService } from "../../../core/services/inventory-item.service";
import { MatSelect } from "@angular/material/select";
import { InventoryService } from "../../../core/services/inventory.service";
import {finalize} from "rxjs/operators";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";
import {InventoryBucketService} from "../../../core/services/inventory-bucket.service";

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
  inventoryIdSelected: any;
  inventorySelectedLoaded: any;

  @ViewChild('inventoryBucketSelect')
  inventoryBucketSelect!: MatSelect;
  inventoryBucketLoaded: any;
  inventoryBucketIdSelected: any;
  inventoryBucketSelectedLoaded: any;

  constructor( private matDialogRef: MatDialogRef<InventoryItemAddComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryItemService,
               private inventoryService: InventoryService,
               private inventoryBucketService: InventoryBucketService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit() {
    this.woId = this.data.woId;
    this.addForm = this.formBuilder.group({
      'workOrder': new FormControl({ "id": this.woId}),
      'inventoryId': new FormControl('', [Validators.required]), // only kept for error validation
      'bucketId': new FormControl('', [Validators.required]),
      'entityName': new FormControl(''),
      'notes': new FormControl(''),
      'unitCost': new FormControl(''),
      'unitPrice': new FormControl('', [Validators.required]),
      'qty': new FormControl('', [Validators.required]),
      'totalPrice': new FormControl('')
    });
    this.loadInventorySelect();

  }

  selectChange() {
    this.inventoryService.get(this.inventoryIdSelected)
      .pipe(finalize(() => {
        this.addForm.controls['inventoryId'].setValue(this.inventorySelectedLoaded.id);
        this.addForm.controls['entityName'].setValue(this.inventorySelectedLoaded.entityName);
        this.addForm.controls['notes'].setValue(this.inventorySelectedLoaded.description);
        this.addForm.controls['unitCost'].setValue(this.inventorySelectedLoaded.unitCost);
        this.addForm.controls['unitPrice'].setValue(this.inventorySelectedLoaded.unitPrice);
        this.loadInventoryBucketSelect();
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

  loadInventoryBucketSelect() {
    this.inventoryBucketService.getAllNonEmptyByInventoryId(this.inventoryIdSelected).subscribe(
      data => {
        this.inventoryBucketLoaded = data;
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
