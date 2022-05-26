import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { SubcontractorItemService } from "../../../core/services/subcontractor-item.service";
import { MatSelect } from "@angular/material/select";
import { SubcontractorService } from "../../../core/services/subcontractor.service";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-subcontractor-item-add',
  templateUrl: './subcontractor-item-add.component.html',
  styleUrls: ['./subcontractor-item-add.component.css']
})
export class SubcontractorItemAddComponent implements OnInit {
  formTitle: string = "Add Subcontractor Item";
  woId: null;
  addForm: FormGroup = new FormGroup({});

  @ViewChild('subcontractorSelect')
  subcontractorSelect!: MatSelect;
  subcontractorLoaded: any;
  subcontractorIdSelected: any;
  subcontractorSelectedLoaded: any;

  constructor( private matDialogRef: MatDialogRef<SubcontractorItemAddComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: SubcontractorItemService,
               private subcontractorService: SubcontractorService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit() {
    this.woId = this.data.woId;
    this.addForm = this.formBuilder.group({
      'workOrder': new FormControl({ "id": this.woId }),
      'subcontractorId': new FormControl('', [Validators.required]),
      'entityName': new FormControl(''),
      'notes': new FormControl(''),
      // 'unitPrice': new FormControl('', [Validators.required]),
      // 'qty': new FormControl('', [Validators.required]),
      // 'total': new FormControl('')
    });
    this.loadSubcontractorSelect();
  }

  selectChange() {
    this.subcontractorService.get(this.subcontractorIdSelected)
      .pipe(finalize(() => {
        this.addForm.controls['subcontractorId'].setValue(this.subcontractorSelectedLoaded.id);
        this.addForm.controls['entityName'].setValue(this.subcontractorSelectedLoaded.entityName);
        // this.addForm.controls['notes'].setValue(this.laborSelectedLoaded.description);
        // this.addForm.controls['ratePerHour'].setValue(this.laborSelectedLoaded.ratePerHour);
      }))
      .subscribe(data => {
          this.subcontractorSelectedLoaded = data;
        },error => {
        }
      );
  }

  loadSubcontractorSelect() {
    this.subcontractorService.getAll().subscribe(
      data => {
        this.subcontractorLoaded = data
          .sort((a, b) => {
            return a.entityName.localeCompare(b.entityName); });
      },error => {
      }
    );
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Subcontractor Item added successfully.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      }
    );
  }

}
