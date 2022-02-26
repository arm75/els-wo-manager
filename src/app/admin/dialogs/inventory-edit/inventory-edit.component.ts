import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { InventoryService } from "../../../core/services/inventory.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Inventory } from "../../../core/models/inventory";
import {MatSelect} from "@angular/material/select";
import {InventoryGroupService} from "../../../core/services/inventory-group.service";
import {InventoryLocationService} from "../../../core/services/inventory-location.service";

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

  @ViewChild('inventoryGroupSelect')
  inventoryGroupSelect!: MatSelect;
  inventoryGroupLoaded: any;
  inventoryGroupSelected!: string;

  @ViewChild('inventoryLocationSelect')
  inventoryLocationSelect!: MatSelect;
  inventoryLocationLoaded: any;
  inventoryLocationSelected!: string;

  constructor( private matDialogRef: MatDialogRef<InventoryEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryService,
               private inventoryGroupService: InventoryGroupService,
               private inventoryLocationService: InventoryLocationService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadInventoryGroupSelect();
    this.loadInventoryLocationSelect();
  }

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
            'entityName': new FormControl(this.entityData.entityName),
            'inventoryGroupId': new FormControl(this.entityData.inventoryGroupId),
            'inventoryLocationId': new FormControl(this.entityData.inventoryLocationId),
            'description': new FormControl(this.entityData.description),
            'qtyInStock': new FormControl(this.entityData.qtyInStock),
            'unitCost': new FormControl(this.entityData.unitCost),
            'unitPrice': new FormControl(this.entityData.unitPrice),
            // 'taxable': new FormControl(this.entityData.taxable),
            // 'taxRateId': new FormControl(this.entityData.taxRateId)
          })
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  selectChange() {
    //console.log(this.selected);
    // alert("You selected" + this.selected);
  }

  loadInventoryGroupSelect() {
    this.inventoryGroupService.getAll().subscribe(
      data => {
        console.log(data);
        this.inventoryGroupLoaded = data;
      },error => {
        console.log(error);
      }
    );
  }

  loadInventoryLocationSelect() {
    this.inventoryLocationService.getAll().subscribe(
      data => {
        console.log(data);
        this.inventoryLocationLoaded = data;
      },error => {
        console.log(error);
      }
    );
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        console.log("Inventory " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("Inventory " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Inventory not edited: " + error);
        this.matSnackBar.open("An error has occurred. Inventory not edited: " + error);
        this.matDialogRef.close();
      });
  }
}
