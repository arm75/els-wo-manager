import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryItemService } from "../../../core/services/inventory-item.service";
import { MatSelect } from "@angular/material/select";
import { InventoryService } from "../../../core/services/inventory.service";
import {finalize, map} from "rxjs/operators";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";
import {InventoryBucketService} from "../../../core/services/inventory-bucket.service";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {InventoryGroupService} from "../../../core/services/inventory-group.service";
import {Inventory} from "../../../core/models/inventory";
import {InventoryBucket} from "../../../core/models/inventory-bucket";

@Component({
  selector: 'app-inventory-item-add',
  templateUrl: './inventory-item-add.component.html',
  styleUrls: ['./inventory-item-add.component.css']
})
export class InventoryItemAddComponent implements OnInit {

  loggedInUser: any;
  loggedInUsername: any;
  loggedInRole: any;
  nameToDisplay: any;
  isAdmin: boolean = false;

  formTitle: string = "Add Inventory Item";
  woId: null;
  addForm: FormGroup = new FormGroup({});

  @ViewChild('inventoryGroupSelect')
  inventoryGroupSelect!: MatSelect;
  inventoryGroupLoaded: any;
  inventoryGroupIdSelected: any;
  inventoryGroupSelectedLoaded: any;

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
               private authenticationService: AuthenticationService,
               private entityService: InventoryItemService,
               private inventoryGroupService: InventoryGroupService,
               private inventoryService: InventoryService,
               private inventoryBucketService: InventoryBucketService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;
    if(this.loggedInRole=="ROLE_ADMIN"||this.loggedInRole=="ROLE_SUPER_ADMIN") {
      this.isAdmin = true;
    }
  }

  ngOnInit() {
    this.woId = this.data.woId;
    this.addForm = this.formBuilder.group({
      'workOrder': new FormControl({ "id": this.woId}),
      'inventoryGroupId': new FormControl('', [Validators.required]),
      'inventoryId': new FormControl('', [Validators.required]), // only kept for error validation
      'bucketId': new FormControl('', [Validators.required]),
      'entityName': new FormControl(''),
      'notes': new FormControl(''),
      'unitCost': new FormControl(''),
      'unitPrice': new FormControl('', [Validators.required]),
      'qty': new FormControl('', [Validators.required]),
      'totalPrice': new FormControl('')
    });
    this.loadInventoryGroupSelect();
    this.loadInventorySelect();
  }

  groupSelectChange() {
    this.loadInventorySelect(this.inventoryGroupIdSelected);
    this.inventoryBucketIdSelected = null;
    // this.inventoryService.get(this.inventoryIdSelected)
    //   .pipe(finalize(() => {
    //     this.addForm.controls['inventoryId'].setValue(this.inventorySelectedLoaded.id);
    //     this.addForm.controls['entityName'].setValue(this.inventorySelectedLoaded.entityName);
    //     this.addForm.controls['notes'].setValue(this.inventorySelectedLoaded.description);
    //     this.addForm.controls['unitCost'].setValue(this.inventorySelectedLoaded.unitCost);
    //     this.addForm.controls['unitPrice'].setValue(this.inventorySelectedLoaded.unitPrice);
    //     this.loadInventorySelect(this.inventoryGroupIdSelected);
    //   })).subscribe(data => {
    //     this.inventorySelectedLoaded = data;
    //   }, error => {
    //   }
    // );
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

  loadInventoryGroupSelect() {
    this.inventoryGroupService.getAll().subscribe(
      data => {
        this.inventoryGroupLoaded = data.sort((a, b) => {
          return a.entityName.localeCompare(b.entityName); });
      },error => {
      }
    );
  }

  loadInventorySelect(passedInvGroupId?: any) {
    if(passedInvGroupId) {
      this.inventoryService.getAll().pipe(map(items => items.filter(item => (item.inventoryGroup.id == this.inventoryGroupIdSelected))))
        .subscribe(data => {
          this.inventoryLoaded = data
            .sort((a, b) => {
              return a.entityName.localeCompare(b.entityName); });
          },
            error => { } );
    } else {
      this.inventoryService.getAll()
        .subscribe(data => { this.inventoryLoaded = data; }, error => { });
    }
  }

  loadInventoryBucketSelect() {
    this.inventoryBucketService.getAllNonEmptyByInventoryId(this.inventoryIdSelected).subscribe(
      data => {
        this.inventoryBucketLoaded = data
          .sort((a,b) => { return InventoryItemAddComponent.compareBucketLocationNames(a, b); });
      },error => {
      }
    );
  }

  private static compareBucketLocationNames(a: InventoryBucket, b: InventoryBucket): number {
    let aName = a.location?.entityName;
    let bName = b.location?.entityName;
    if(aName==null){ aName=''; }
    if(bName==null){ bName=''; }
    if(aName.toLowerCase() < bName.toLowerCase()) {
      return -1;
    }
    if(aName.toLowerCase() > bName.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matDialogRef.close(true);
        this.globalSnackBarService.success("Inventory Item added successfully.");
      }, error => {
        this.matDialogRef.close(false);
        this.globalSnackBarService.error(error.error.message);
      }, () => { });
  }

}

