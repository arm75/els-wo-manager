import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { LaborItemService } from "../../../core/services/labor-item.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LaborItem } from "../../../core/models/labor-item";
import { MatSelect } from "@angular/material/select";
import { LaborService } from "../../../core/services/labor.service";

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

  @ViewChild('laborSelect')
  laborSelect!: MatSelect;
  laborLoaded: any;
  laborSelected!: string;

  constructor( private matDialogRef: MatDialogRef<LaborItemEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: LaborItemService,
               private laborService: LaborService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadLaborSelect();
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
            'laborId': new FormControl(this.entityData.laborId),
            'workOrderId': new FormControl(this.woId),
            'notes': new FormControl(this.entityData.notes),
            'ratePerHour': new FormControl(this.entityData.ratePerHour),
            'hours': new FormControl(this.entityData.hours),
            'minutes': new FormControl(this.entityData.minutes),
            'total': new FormControl(this.entityData.total),
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

  loadLaborSelect() {
    this.laborService.getAll().subscribe(
      data => {
        console.log(data);
        this.laborLoaded = data;
      },error => {
        console.log(error);
      }
    );
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        console.log("Labor Item " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("Labor Item " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Labor Item not edited: " + error);
        this.matSnackBar.open("An error has occurred. Labor Item not edited: " + error);
        this.matDialogRef.close();
      });
  }
}
