import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { InventoryService } from "../../../core/services/inventory.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSelect } from "@angular/material/select";
import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import { InventoryLocationService } from "../../../core/services/inventory-location.service";

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
  inventoryGroupSelected!: string;

  @ViewChild('inventoryLocationSelect')
  inventoryLocationSelect!: MatSelect;
  inventoryLocationLoaded: any;
  inventoryLocationSelected!: string;

  constructor( private matDialogRef: MatDialogRef<InventoryAddComponent>,
               private entityService: InventoryService,
               private inventoryGroupService: InventoryGroupService,
               private inventoryLocationService: InventoryLocationService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadInventoryGroupSelect();
    this.loadInventoryLocationSelect();
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      'entityName': new FormControl(''),
      'inventoryGroupId': new FormControl(''),
      'inventoryLocationId': new FormControl(''),
      'description': new FormControl(''),
      'qtyInStock': new FormControl(''),
      'unitCost': new FormControl(''),
      'unitPrice': new FormControl(''),
      // 'taxable': new FormControl(''),
      // 'taxRateId': new FormControl('')
    });
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

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Inventory added successfully.");
        console.log("Inventory added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Inventory not added: " + error);
        this.matSnackBar.open("An error has occurred. Inventory not added: " + error);
        this.matDialogRef.close();
      });
  }
}
