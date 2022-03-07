import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ToolEquipmentItemService } from "../../../core/services/tool-equipment-item.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ToolEquipmentItem } from "../../../core/models/tool-equipment-item";
import {MatSelect} from "@angular/material/select";
import {ToolEquipmentService} from "../../../core/services/tool-equipment.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-tool-equipment-item-edit',
  templateUrl: './tool-equipment-item-edit.component.html',
  styleUrls: ['./tool-equipment-item-edit.component.css']
})
export class ToolEquipmentItemEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Tool/Equipment Item";
  woId: null;
  entityId: null;
  entityData!: ToolEquipmentItem;
  editForm: FormGroup = new FormGroup({});

  @ViewChild('toolEquipmentSelect')
  toolEquipmentSelect!: MatSelect;

  toolEquipmentLoaded: any;
  toolEquipmentSelected!: string;
  toolEquipmentSelectedLoaded: any;

  constructor( private matDialogRef: MatDialogRef<ToolEquipmentItemEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: ToolEquipmentItemService,
               private toolEquipmentService: ToolEquipmentService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadToolEquipmentSelect();
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
            'toolEquipmentId': new FormControl(this.entityData.toolEquipmentId),
            'workOrderId': new FormControl(this.woId),
	          'notes': new FormControl(this.entityData.notes),
            'pricePerDay': new FormControl(this.entityData.pricePerDay),
            'days': new FormControl(this.entityData.days),
            'status': new FormControl(this.entityData.status),
          })
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  selectChange() {
    this.toolEquipmentService.get(this.toolEquipmentSelected)
      .pipe(finalize(() => {
        this.editForm.controls['notes'].setValue(this.toolEquipmentSelectedLoaded.description);
        this.editForm.controls['pricePerDay'].setValue(this.toolEquipmentSelectedLoaded.pricePerDay);
      }))
      .subscribe(
        data => {
          this.toolEquipmentSelectedLoaded = data;
        }, error => {
          alert("there was an error");
        });
  }

  loadToolEquipmentSelect() {
    this.toolEquipmentService.getAll().subscribe(
      data => {
        console.log(data);
        this.toolEquipmentLoaded = data;
      },error => {
        console.log(error);
      }
    );
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        console.log("Tool/Equipment Item " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("Tool/Equipment Item " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Tool/Equipment Item not edited: " + error);
        this.matSnackBar.open("An error has occurred. Tool/Equipment Item not edited: " + error);
        this.matDialogRef.close();
      });
  }
}
