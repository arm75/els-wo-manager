import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { SubcontractorItemService } from "../../../core/services/subcontractor-item.service";
import { SubcontractorItem } from "../../../core/models/subcontractor-item";
import { MatSelect } from "@angular/material/select";
import { SubcontractorService } from "../../../core/services/subcontractor.service";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

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
  subcontractorSelected: any;

  constructor( private matDialogRef: MatDialogRef<SubcontractorItemEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: SubcontractorItemService,
               private subcontractorService: SubcontractorService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

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
            'subcontractor': new FormControl(this.entityData.subcontractor, [Validators.required]),
            'workOrder': new FormControl(this.entityData.workOrder),
            'notes': new FormControl(this.entityData.notes),
            'unitPrice': new FormControl(this.entityData.unitPrice, [Validators.required]),
            'qty': new FormControl(this.entityData.qty, [Validators.required]),
            'total': new FormControl('')
          });
        })
        .catch( error => {
        })
        .finally(() => {
          this.dataLoaded = true;
          this.loadSubcontractorSelect();
        }
      );
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.entityName === o2.entityName && o1.id === o2.id;
  }

  selectChange() {
  }

  loadSubcontractorSelect() {
    this.subcontractorService.getAll().subscribe(
      data => {
        this.subcontractorLoaded = data;
      },error => {
      }
    );
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Subcontractor Item: " + this.editForm.value.id + " has been updated.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error("An error has occurred: " + error);
      }
    );
  }

}
