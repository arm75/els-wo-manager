import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryItemService } from "../../../core/services/inventory-item.service";
import { InventoryItem } from "../../../core/models/inventory-item";
import { MatSelect } from "@angular/material/select";
import { InventoryService } from "../../../core/services/inventory.service";
import {finalize} from "rxjs/operators";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";
import {InventoryBucketService} from "../../../core/services/inventory-bucket.service";
import {AuthenticationService} from "../../../core/security/authentication.service";

@Component({
  selector: 'app-inventory-item-edit',
  templateUrl: './inventory-item-edit.component.html',
  styleUrls: ['./inventory-item-edit.component.css']
})
export class InventoryItemEditComponent implements OnInit {

  loggedInUser: any;
  loggedInUsername: any;
  loggedInRole: any;
  nameToDisplay: any;
  isAdmin: boolean = false;

  dataLoaded: boolean = false;
  formTitle: string = "Edit Inventory Item";
  woId: null;
  entityId: null;
  entityData!: InventoryItem;
  editForm: FormGroup = new FormGroup({});

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

  constructor( private matDialogRef: MatDialogRef<InventoryItemEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private authenticationService: AuthenticationService,
               private entityService: InventoryItemService,
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
            'workOrder': new FormControl(this.entityData.workOrder),
            'inventoryId': new FormControl(this.entityData.inventoryId, [Validators.required]), // only kept for error validation
            'bucketId': new FormControl(this.entityData.bucketId, [Validators.required]),
            'entityName': new FormControl(this.entityData.entityName),
            'notes': new FormControl(this.entityData.notes),
            'unitCost': new FormControl(this.entityData.unitCost),
            'unitPrice': new FormControl(this.entityData.unitPrice, [Validators.required]),
            'qty': new FormControl(this.entityData.qty, [Validators.required]),
            'totalPrice': new FormControl(this.entityData.totalPrice)
          });
        })
        .catch(error => {
        })
        .finally(() => {
          this.dataLoaded = true;
          this.loadInventorySelect();
          this.loadInventoryBucketSelect();
        }
      );
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.entityName === o2.entityName && o1.id === o2.id;
  }

  selectChange() {
    this.inventoryService.get(this.inventoryIdSelected)
      .pipe(finalize(() => {
        this.editForm.controls['inventoryId'].setValue(this.inventorySelectedLoaded.id);
        this.editForm.controls['entityName'].setValue(this.inventorySelectedLoaded.entityName);
        this.editForm.controls['notes'].setValue(this.inventorySelectedLoaded.description);
        this.editForm.controls['unitCost'].setValue(this.inventorySelectedLoaded.unitCost);
        this.editForm.controls['unitPrice'].setValue(this.inventorySelectedLoaded.unitPrice);
        this.loadInventoryBucketSelect();
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

  loadInventoryBucketSelect() {
    this.inventoryBucketService.getAllNonEmptyByInventoryId(this.entityData.inventoryId).subscribe(
      data => {
        this.inventoryBucketLoaded = data;
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
