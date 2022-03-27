import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { InventoryService } from "../../../core/services/inventory.service";
import { Inventory } from "../../../core/models/inventory";
import { MatSelect} from "@angular/material/select";
import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import { InventoryLocationService } from "../../../core/services/inventory-location.service";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";

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
  inventoryGroupSelected: any;

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
            'description': new FormControl(this.entityData.description),
            'totalInStock': new FormControl(this.entityData.totalInStock, [Validators.required]),
            'unitCost': new FormControl(this.entityData.unitCost, [Validators.required]),
            'unitPrice': new FormControl(this.entityData.unitPrice, [Validators.required])
          });
        })
        .catch(error => {
        })
        .finally(() => {
          this.dataLoaded = true;
          this.loadInventoryGroupSelect();
        }
      );
    }
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
