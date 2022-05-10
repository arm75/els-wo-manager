import {Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-inventory-group-add',
  templateUrl: './inventory-group-add.component.html',
  styleUrls: ['./inventory-group-add.component.css']
})
export class InventoryGroupAddComponent implements OnInit {

  formTitle: string = "Add Inventory Group";
  addForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<InventoryGroupAddComponent>,
               private entityService: InventoryGroupService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      'entityName': new FormControl('', [Validators.required]),
      'description': new FormControl('')
    });
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Inventory Group added successfully.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }

}
