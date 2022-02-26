import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { SubcontractorItemService } from "../../../core/services/subcontractor-item.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SubcontractorItem } from "../../../core/models/subcontractor-item";
import { MatSelect } from "@angular/material/select";
import { SubcontractorService } from "../../../core/services/subcontractor.service";

@Component({
  selector: 'app-subcontractor-item-edit',
  templateUrl: './subcontractor-item-edit.component.html',
  styleUrls: ['./subcontractor-item-edit.component.css']
})
export class SubcontractorItemEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Subcontractor Item";
  woId: null;
  entityId: null;
  entityData!: SubcontractorItem;
  editForm: FormGroup = new FormGroup({});

  @ViewChild('subcontractorSelect')
  subcontractorSelect!: MatSelect;
  subcontractorLoaded: any;
  subcontractorSelected!: string;

  constructor( private matDialogRef: MatDialogRef<SubcontractorItemEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: SubcontractorItemService,
               private subcontractorService: SubcontractorService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadSubcontractorSelect();
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
            'subcontractorId': new FormControl(this.entityData.subcontractorId),
            'workOrderId': new FormControl(this.woId),
            'notes': new FormControl(this.entityData.notes),
            'unitPrice': new FormControl(this.entityData.unitPrice),
            'qty': new FormControl(this.entityData.qty),
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

  loadSubcontractorSelect() {
    this.subcontractorService.getAll().subscribe(
      data => {
        console.log(data);
        this.subcontractorLoaded = data;
      },error => {
        console.log(error);
      }
    );
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        console.log("Subcontractor Item " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("Subcontractor Item " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Subcontractor Item not edited: " + error);
        this.matSnackBar.open("An error has occurred. Subcontractor Item not edited: " + error);
        this.matDialogRef.close();
      });
  }
}
