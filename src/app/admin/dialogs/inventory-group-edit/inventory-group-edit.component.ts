import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import { InventoryGroup } from "../../../core/models/inventory-group";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-inventory-group-edit',
  templateUrl: './inventory-group-edit.component.html',
  styleUrls: ['./inventory-group-edit.component.css']
})
export class InventoryGroupEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Inventory Group";
  entityId: null;
  entityData!: InventoryGroup;
  editForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<InventoryGroupEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: InventoryGroupService,
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
          console.log(data);
          this.editForm = this.formBuilder.group({
            'id': new FormControl(this.entityData.id),
	          'entityName': new FormControl(this.entityData.entityName, [Validators.required]),
	          'description': new FormControl(this.entityData.description)
          })
        })
        .catch(error => { })
        .finally(() => { this.dataLoaded = true; });
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.entityName === o2.entityName && o1.id === o2.id;
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Inventory Group: " + this.editForm.value.id + " has been updated.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }

}
