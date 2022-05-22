import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SubcontractorService } from "../../../core/services/subcontractor.service";
import { Subcontractor } from "../../../core/models/subcontractor";
import { ElsWoManagerConstants } from "../../../core/els-wo-manager-constants";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";
import {MatSelect} from "@angular/material/select";
import {SubcontractorGroupService} from "../../../core/services/subcontractor-group.service";

@Component({
  selector: 'app-subcontractor-edit',
  templateUrl: './subcontractor-edit.component.html',
  styleUrls: ['./subcontractor-edit.component.css']
})
export class SubcontractorEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Subcontractor";
  entityId: null;
  entityData!: Subcontractor;
  editForm: FormGroup = new FormGroup({});
  usStates = ElsWoManagerConstants.usStatesSelectArray;

  @ViewChild('subcontractorGroupSelect')
  subcontractorGroupSelect!: MatSelect;
  subcontractorGroupLoaded: any;
  subcontractorGroupSelected: any;

  constructor( private matDialogRef: MatDialogRef<SubcontractorEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: SubcontractorService,
               private subcontractorGroupService: SubcontractorGroupService,
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
          this.editForm = this.formBuilder.group({
            'id': new FormControl(this.entityData.id),
            'entityName': new FormControl(this.entityData.entityName, [Validators.required]),
            'subcontractorGroup': new FormControl(this.entityData.subcontractorGroup, [Validators.required]),
            'address': new FormControl(this.entityData.address, [Validators.required]),
            'unit': new FormControl(this.entityData.unit),
            'city': new FormControl(this.entityData.city, [Validators.required]),
            'state': new FormControl(this.entityData.state, [Validators.required]),
            'zipCode': new FormControl(this.entityData.zipCode, [Validators.required]),
            'phoneNumb': new FormControl(this.entityData.phoneNumb),
            'altPhoneNumb': new FormControl(this.entityData.altPhoneNumb),
            'emailAddress': new FormControl(this.entityData.emailAddress, [Validators.email])
          });
        })
        .catch(error => {
        })
        .finally(()=>{
          this.loadSubcontractorGroupSelect();
          this.dataLoaded = true;
        });
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.entityName === o2.entityName && o1.id === o2.id;
  }

  selectChange() {
  }

  loadSubcontractorGroupSelect() {
    this.subcontractorGroupService.getAll().subscribe(
      data => {
        this.subcontractorGroupLoaded = data;
      },error => {
      }
    );
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Subcontractor: " + this.editForm.value.id + " has been updated.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }
}
