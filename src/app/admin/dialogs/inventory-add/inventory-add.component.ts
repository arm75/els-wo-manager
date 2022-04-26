import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryService } from "../../../core/services/inventory.service";
import { MatSelect } from "@angular/material/select";
import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import { InventoryLocationService } from "../../../core/services/inventory-location.service";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";
import {InventoryLocation} from "../../../core/models/inventory-location";
import {InventoryBucket} from "../../../core/models/inventory-bucket";

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']
})
export class InventoryAddComponent implements OnInit {
  formTitle: string = "Add Inventory";
  addForm: FormGroup = new FormGroup({});

  @ViewChild('inventoryGroupSelect')
  inventoryGroupSelect!: MatSelect;
  inventoryGroupLoaded: any;
  inventoryGroupSelected: any;

  @ViewChild('inventoryLocationSelect')
  inventoryLocationSelect!: MatSelect;
  inventoryLocationsLoaded: any;
  inventoryLocationSelected: any;

  constructor( private matDialogRef: MatDialogRef<InventoryAddComponent>,
               private entityService: InventoryService,
               private inventoryGroupService: InventoryGroupService,
               private inventoryLocationService: InventoryLocationService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      'entityName': new FormControl('', [Validators.required]),
      'inventoryGroup': new FormControl('', [Validators.required]),
      'buckets': this.formBuilder.array([]),
      'description': new FormControl(''),
      'unitCost': new FormControl('', [Validators.required]),
      'unitPrice': new FormControl('', [Validators.required]),
      'totalInStock': new FormControl('', [Validators.required]),
    });
    this.loadInventoryGroupSelect();
    this.loadInventoryLocationSelect();
  }

  createBucketFormGroup( bucket: InventoryBucket, index?: number) {
    return this.formBuilder.group({
      //'id': new FormControl(bucket.id),
      'inventory': new FormGroup({
        'id': new FormControl(0),
        //'entityName': new FormControl(this.entityData.entityName)
      }),
      'location': new FormGroup( {
        'id': new FormControl(bucket.location?.id),
        'entityName': new FormControl(bucket.location?.entityName)
      }),
      'qtyInStock': new FormControl(bucket.qtyInStock),
    });
  }

  addBucketControl(bucket: InventoryBucket, index?: number) {
    if (index) { this.buckets.push(this.createBucketFormGroup(bucket, index)); }
    else { this.buckets.push(this.createBucketFormGroup(bucket)); }
  }

  get buckets() {
    return this.addForm?.get('buckets') as FormArray;
  }

  selectChange() {
  }

  loadInventoryGroupSelect() {
    this.inventoryGroupService.getAll().subscribe(
      data => {
        this.inventoryGroupLoaded = data;
      },error => {
      }
    );
  }

  loadInventoryLocationSelect() {
    this.inventoryLocationService.getAll().subscribe(
      data => {
        this.inventoryLocationsLoaded = data;
        //this.inventoryLocationLoaded = this.inventoryLocationLoaded.filter((ar: { id: number; }) => !this.data.find((rm: { id: number; }) => (rm.id === ar.id) ));
      },error => {
      }
    );
  }

  createNewInventoryBucket(location: InventoryLocation) {
    this.inventoryLocationsLoaded = this.inventoryLocationsLoaded.filter(function (obj: InventoryLocation) { return obj.id !== location.id; });
    let inventoryBucket: InventoryBucket;
    inventoryBucket = {
      // 'inventory': { "id": 0 },
      'location': location,
      'qtyInStock': 0
    };
    this.addBucketControl(inventoryBucket);
    this.inventoryLocationSelected = "";
    //this.loadInventoryLocationSelect();
  }

  removeInventoryBucket(bucketsIndexToRemove: number, bucketToRemove: InventoryBucket) {
    this.buckets.removeAt(bucketsIndexToRemove);
    this.inventoryLocationsLoaded.push(bucketToRemove.location);
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Inventory added successfully.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      }
    );
  }

}
