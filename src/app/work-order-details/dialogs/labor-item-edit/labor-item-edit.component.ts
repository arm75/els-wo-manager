import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { LaborItemService } from "../../../core/services/labor-item.service";
import { LaborItem } from "../../../core/models/labor-item";
import { MatSelect } from "@angular/material/select";
import { LaborService } from "../../../core/services/labor.service";
import {ElsWoManagerConstants} from "../../../core/els-wo-manager-constants";
import {finalize} from "rxjs/operators";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-labor-item-edit',
  templateUrl: './labor-item-edit.component.html',
  styleUrls: ['./labor-item-edit.component.css']
})
export class LaborItemEditComponent implements OnInit {
  dataLoaded: boolean = false;
  formTitle: string = "Edit Labor Item";
  woId: null;
  entityId: null;
  entityData!: LaborItem;
  editForm: FormGroup = new FormGroup({});
  hours = ElsWoManagerConstants.hoursSelectArray;
  minutes = ElsWoManagerConstants.minutesSelectArray;

  @ViewChild('laborSelect')
  laborSelect!: MatSelect;
  laborLoaded: any;
  laborSelected: any;
  laborSelectedLoaded: any;

  constructor( private matDialogRef: MatDialogRef<LaborItemEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: LaborItemService,
               private laborService: LaborService,
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
            'labor': new FormControl(this.entityData.labor, [Validators.required]),
            'workOrder': new FormControl(this.entityData.workOrder),
            'notes': new FormControl(this.entityData.notes),
            'ratePerHour': new FormControl(this.entityData.ratePerHour, [Validators.required]),
            'hours': new FormControl(this.entityData.hours, [Validators.required]),
            'minutes': new FormControl(this.entityData.minutes, [Validators.required]),
            'totalPrice': new FormControl(this.entityData.totalPrice)
          });
        })
        .catch(error => {
        })
        .finally(() => {
          this.dataLoaded = true;
          this.loadLaborSelect();
        }
      );
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.entityName === o2.entityName && o1.id === o2.id;
  }

  selectChange() {
    this.laborService.get(this.laborSelected.id)
      .pipe(finalize(() => {
        this.editForm.controls['notes'].setValue(this.laborSelectedLoaded.description);
        this.editForm.controls['ratePerHour'].setValue(this.laborSelectedLoaded.ratePerHour);
      }))
      .subscribe(
        data => {
          this.laborSelectedLoaded = data;
        }, error => {
        }
      );
  }

  loadLaborSelect() {
    this.laborService.getAll().subscribe(
      data => {
        this.laborLoaded = data;
      },error => {
      }
    );
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Labor Item: " + this.editForm.value.id + " has been updated.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      }
    );
  }

}
