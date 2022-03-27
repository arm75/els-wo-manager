import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryService } from "../../../core/services/inventory.service";
import { MatSelect } from "@angular/material/select";
import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import { InventoryLocationService } from "../../../core/services/inventory-location.service";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";

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

  constructor( private matDialogRef: MatDialogRef<InventoryAddComponent>,
               private entityService: InventoryService,
               private inventoryGroupService: InventoryGroupService,
               private inventoryLocationService: InventoryLocationService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) {

  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      'entityName': new FormControl('', [Validators.required]),
      'inventoryGroup': new FormControl('', [Validators.required]),
      'description': new FormControl(''),
      'totalInStock': new FormControl('', [Validators.required]),
      'unitCost': new FormControl('', [Validators.required]),
      'unitPrice': new FormControl('', [Validators.required])
    });
    this.loadInventoryGroupSelect();
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
