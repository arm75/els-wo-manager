import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryService } from "../../../core/services/inventory.service";
import { Inventory } from "../../../core/models/inventory";
import { MatSelect} from "@angular/material/select";
import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import { InventoryLocationService } from "../../../core/services/inventory-location.service";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";
import {InventoryBucket} from "../../../core/models/inventory-bucket";
import {InventoryLocation} from "../../../core/models/inventory-location";

@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css']
})
export class InventoryEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Inventory";
  entityId: null;
  entityData!: Inventory;
  editForm: FormGroup = new FormGroup({});
  //bucketForm: FormGroup = new FormGroup({});
  bucketData: any;
  bucketSum: number = 0;

  @ViewChild('inventoryGroupSelect')
  inventoryGroupSelect!: MatSelect;
  inventoryGroupLoaded: any;
  inventoryGroupSelected: any;

  @ViewChild('inventoryLocationSelect')
  inventoryLocationSelect!: MatSelect;
  inventoryLocationsLoaded: any;
  inventoryLocationSelected: any;

  constructor( private matDialogRef: MatDialogRef<InventoryEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryService,
               private inventoryGroupService: InventoryGroupService,
               private inventoryLocationService: InventoryLocationService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.entityId = this.data.entityId;
    if (this.entityId != null) {
      this.entityService.get(this.entityId)
        .toPromise()
        .then(data => {
          this.entityData = data;
          this.editForm = this.formBuilder.group({
            'id': new FormControl(this.entityData.id),
            'entityName': new FormControl(this.entityData.entityName, [Validators.required]),
            'inventoryGroup': new FormControl(this.entityData.inventoryGroup, [Validators.required]),
            'buckets': new FormArray([]),
            'description': new FormControl(this.entityData.description),
            'unitCost': new FormControl(this.entityData.unitCost, [Validators.required]),
            'unitPrice': new FormControl(this.entityData.unitPrice, [Validators.required]),
            'totalInStock': new FormControl(this.entityData.totalInStock, [Validators.required]),
          });

        })
        .catch(error => {
        })
        .finally(() => {
          this.dataLoaded = true;
          this.loadInventoryGroupSelect();
          this.loadInventoryLocationSelect();
          this.bucketData = this.entityData.buckets;
          this.bucketSum = this.bucketData.reduce((accumulator: number, data: any) => { return accumulator + data.qtyInStock; }, 0);
          //console.log("Bucket Sum:\n");
          //console.table(this.bucketSum);
          //this.editForm.controls['totalInStock'].setValue(this.bucketSum);
          this.bucketData.forEach( (bucket: InventoryBucket, index: number) => {
            this.addBucketControl(bucket, index);
          });

          //console.log(this.editForm);
        }
      );
    }
  }

  createBucketFormGroup( bucket: InventoryBucket, index?: number) {
    return this.formBuilder.group({
      'id': new FormControl(bucket.id),
      'inventory': new FormGroup({
        'id': new FormControl(this.entityData.id),
        'entityName': new FormControl(this.entityData.entityName)
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
    return this.editForm?.get('buckets') as FormArray;
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.entityName === o2.entityName && o1.id === o2.id;
  }

  selectChange() {
    //console.log(this.selected);
    // alert("You selected" + this.selected);
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
    this.inventoryLocationService.getUnusedByInvId(this.entityId).subscribe(
      data => {
        this.inventoryLocationsLoaded = data;
        //this.inventoryLocationLoaded = this.inventoryLocationLoaded.filter((ar: { id: number; }) => !this.data.find((rm: { id: number; }) => (rm.id === ar.id) ));
      },error => {
      }
    );
  }

  createNewInventoryBucket(location: InventoryLocation) {
    console.log("location passed:\n");
    console.table(location);
    this.inventoryLocationsLoaded = this.inventoryLocationsLoaded.filter(function (obj: InventoryLocation) { return obj.id !== location.id; });
    console.log("inventoryLocationsLoaded: \n");
    console.table(this.inventoryLocationsLoaded);
    let inventoryBucket: InventoryBucket;
    inventoryBucket = {
      'inventory': this.entityData,
      'location': location,
      'qtyInStock': 0
    };
    this.addBucketControl(inventoryBucket);
    this.inventoryLocationSelected = "";
    //this.loadInventoryLocationSelect();
  }

  removeInventoryBucket(bucketsIndexToRemove: number, bucketToRemove: InventoryBucket) {
    console.log("Bucket to Remove:\n");
    console.log(bucketsIndexToRemove);
    // this.images.removeAt(this.images.value.findIndex(image => image.id === 502))
    this.buckets.removeAt(bucketsIndexToRemove);
    this.inventoryLocationsLoaded.push(bucketToRemove.location);
    console.table(this.buckets.value);
  }

  calcTotalInStock() {
    let total = this.buckets.value.reduce((sum: any, item: any) => sum + +item.qtyInStock, 0);
    this.editForm.controls['totalInStock'].setValue(total);
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Inventory: " + this.editForm.value.id + " has been updated.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }

}
