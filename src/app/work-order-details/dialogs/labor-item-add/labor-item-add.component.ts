import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { LaborItemService } from "../../../core/services/labor-item.service";
import { MatSelect } from "@angular/material/select";
import { LaborService } from "../../../core/services/labor.service";
import { ElsWoManagerConstants } from "../../../core/els-wo-manager-constants";
import {finalize} from "rxjs/operators";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";
import {AuthenticationService} from "../../../core/security/authentication.service";

@Component({
  selector: 'app-labor-item-add',
  templateUrl: './labor-item-add.component.html',
  styleUrls: ['./labor-item-add.component.css']
})
export class LaborItemAddComponent implements OnInit {

  loggedInUser: any;
  loggedInUsername: any;
  loggedInRole: any;
  nameToDisplay: any;
  isAdmin: boolean = false;

  formTitle: string = "Add Labor Item";
  woId: null;
  addForm: FormGroup = new FormGroup({});
  hours = ElsWoManagerConstants.hoursSelectArray;
  minutes = ElsWoManagerConstants.minutesSelectArray;

  @ViewChild('laborSelect')
  laborSelect!: MatSelect;
  laborLoaded: any;
  laborIdSelected: any;
  laborSelectedLoaded: any;

  constructor( private matDialogRef: MatDialogRef<LaborItemAddComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private authenticationService: AuthenticationService,
               private entityService: LaborItemService,
               private laborService: LaborService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;
    if(this.loggedInRole=="ROLE_ADMIN"||this.loggedInRole=="ROLE_SUPER_ADMIN") {
      this.isAdmin = true;
    }
  }

  ngOnInit() {
    this.woId = this.data.woId;
    this.addForm = this.formBuilder.group({
      'workOrder': new FormControl({ "id": this.woId }),
      'laborId': new FormControl('', [Validators.required]),
      'entityName': new FormControl(''),
      'notes': new FormControl(''),
      'ratePerHour': new FormControl('', [Validators.required]),
      'hours': new FormControl('', [Validators.required]),
      'minutes': new FormControl('', [Validators.required]),
      'total': new FormControl('')
    });
    this.loadLaborSelect();
  }

  selectChange() {
    this.laborService.get(this.laborIdSelected)
      .pipe(finalize(() => {
        this.addForm.controls['laborId'].setValue(this.laborSelectedLoaded.id);
        this.addForm.controls['entityName'].setValue(this.laborSelectedLoaded.entityName);
        this.addForm.controls['notes'].setValue(this.laborSelectedLoaded.description);
        this.addForm.controls['ratePerHour'].setValue(this.laborSelectedLoaded.ratePerHour);
      }))
      .subscribe(data => {
          this.laborSelectedLoaded = data;
      },error => {
      }
    );
  }

  loadLaborSelect() {
    this.laborService.getAll().subscribe(
      data => {
        this.laborLoaded = data.sort((a, b) => {
          return a.entityName.localeCompare(b.entityName); });
      },error => {
      }
    );
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matDialogRef.close(true);
        this.globalSnackBarService.success("Labor Item added successfully.");
      }, error => {
        this.matDialogRef.close(false);
        this.globalSnackBarService.error(error.error.message);
      }
    );
  }

}
