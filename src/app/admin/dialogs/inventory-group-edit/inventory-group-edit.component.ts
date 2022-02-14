import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { InventoryGroup } from "../../../core/models/inventory-group";

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
        console.log("Inventory Group " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("Inventory Group " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Inventory Group not edited: " + error);
        this.matSnackBar.open("An error has occurred. Inventory Group not edited: " + error);
        this.matDialogRef.close();
      });
  }
}
