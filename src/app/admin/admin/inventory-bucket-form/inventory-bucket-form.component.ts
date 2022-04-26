import { Component, OnInit } from '@angular/core';
import {InventoryBucketService} from "../../../core/services/inventory-bucket.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InventoryBucket} from "../../../core/models/inventory-bucket";
import {InventoryLocationService} from "../../../core/services/inventory-location.service";

@Component({
  selector: 'app-inventory-bucket-form',
  templateUrl: './inventory-bucket-form.component.html',
  styleUrls: ['./inventory-bucket-form.component.css']
})
export class InventoryBucketFormComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Inventory Buckets";
  entityId: any;
  entityData: any;
  bucketForm: FormGroup = new FormGroup({});

  constructor(
    private entityService: InventoryBucketService,
    private inventoryLocationService: InventoryLocationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.bucketForm = this.formBuilder.group({
      'buckets': new FormArray([])
    });

    this.dataLoaded = false;
    //this.entityId = this.data.entityId;
    this.entityId = 100028;
    if (this.entityId != null) {
      this.entityService.getAllByInventoryId(this.entityId)
        // .pipe(map(items =>
        //   items.filter(item => (item.workOrder.id == this.passedWorkOrderId))))
        .subscribe(data => {
          //console.table(data);
          this.entityData = data;
          data.forEach( (bucket: InventoryBucket, index: number) => {
            //alert('bucket');
            this.addBucketControl(bucket, index);
          });
          // data.forEach(a => this.componentTotal += a.totalPrice);
          // this.totalChangedEvent.emit(this.componentTotal);
          // this.dataSource = new MatTableDataSource(data);
          // this.dataSource.sort = this.sort;
          // this.dataSource.paginator = this.paginator;
        });
        // this.entityData.forEach( (bucket: InventoryBucket, index: number) => {
        //   alert('bucket');
        //   this.addBucketControl(bucket, index);
        // });


    }
  }

  createBucketFormGroup( bucket: InventoryBucket, index: number) {
    return this.formBuilder.group({
      'id': new FormControl(bucket.id),
      'inventory': new FormGroup({
        'id': new FormControl(bucket.inventory?.id),
        'entityName': new FormControl(bucket.inventory?.entityName)
      }),
      'location': new FormGroup( {
        'id': new FormControl(bucket.location?.id),
        'entityName': new FormControl(bucket.location?.entityName)
      }),
      'qtyInStock': new FormControl(bucket.qtyInStock),
    });
  }

  addBucketControl(bucket: InventoryBucket, index: number) {
    this.buckets.push(this.createBucketFormGroup(bucket, index));
  }

  get buckets() {
    return this.bucketForm?.get('buckets') as FormArray;
  }

  submitForm() {
    console.table(JSON.stringify(this.bucketForm.value.buckets[0]));
    this.entityService.update(this.bucketForm.value.buckets[0])
      .subscribe(data => {
        console.log("Saved");
        //this.matDialogRef.close();
        //this.globalSnackBarService.success("Inventory: " + this.editForm.value.id + " has been updated.");
      }, error => {
        console.log("Error");
        //this.matDialogRef.close();
        //this.globalSnackBarService.error(error.error.message);
      });
  }

}
