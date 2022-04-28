import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SubcontractorItemService } from "../../../core/services/subcontractor-item.service";
import { SubcontractorItem } from "../../../core/models/subcontractor-item";
import { MatSelect } from "@angular/material/select";
import { SubcontractorService } from "../../../core/services/subcontractor.service";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";
import {AuthenticationService} from "../../../core/security/authentication.service";

@Component({
  selector: 'app-subcontractor-item-complete',
  templateUrl: './subcontractor-item-complete.component.html',
  styleUrls: ['./subcontractor-item-complete.component.css']
})
export class SubcontractorItemCompleteComponent implements OnInit {

  loggedInUser!: any;
  loggedInUsername!: string;
  loggedInRole!: string;
  nameToDisplay!: string;

  dataLoaded: boolean = false;
  formTitle: string = "Complete Subcontractor Item";
  woId: null;
  entityId: null;
  entityData!: SubcontractorItem;
  editForm: FormGroup = new FormGroup({});

  @ViewChild('subcontractorSelect')
  subcontractorSelect!: MatSelect;
  subcontractorLoaded: any;
  subcontractorIdSelected: any;

  constructor( private matDialogRef: MatDialogRef<SubcontractorItemCompleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: SubcontractorItemService,
               private subcontractorService: SubcontractorService,
               private authenticationService: AuthenticationService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;
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
            'workOrder': new FormControl(this.entityData.workOrder),
            'subcontractorId': new FormControl(this.entityData.subcontractorId, [Validators.required]),
            'entityName': new FormControl(this.entityData.entityName),
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

  completeEntity() {
    this.entityService.complete(this.editForm.value)
      .subscribe(data => {
          this.matDialogRef.close();
          this.globalSnackBarService.success("Subcontractor Item: " + this.editForm.value.id + " has been completed.");
        }, error => {
          this.matDialogRef.close();
          this.globalSnackBarService.error("An error has occurred: " + error);
        }
      );
  }

}
