import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { InventoryService } from "../../../core/services/inventory.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Inventory } from "../../../core/models/inventory";

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

  constructor( private matDialogRef: MatDialogRef<InventoryEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
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
            'entityName': new FormControl(this.entityData.entityName),
            'description': new FormControl(this.entityData.description),
            'unitCost': new FormControl(this.entityData.unitCost),
            'unitPrice': new FormControl(this.entityData.unitPrice),
            'qtyInStock': new FormControl(this.entityData.qtyInStock),
            'taxable': new FormControl(this.entityData.taxable),
            'taxRateId': new FormControl(this.entityData.taxRateId)
          })
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
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
