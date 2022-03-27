import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { SubcontractorItemService } from "../../../core/services/subcontractor-item.service";
import { MatSelect } from "@angular/material/select";
import { SubcontractorService } from "../../../core/services/subcontractor.service";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

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
  subcontractorSelected: any;

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
      'subcontractor': new FormControl('', [Validators.required]),
      'workOrder': new FormControl({ "id": this.woId }),
      'notes': new FormControl(''),
      'unitPrice': new FormControl('', [Validators.required]),
      'qty': new FormControl('', [Validators.required]),
      'total': new FormControl('')
    });
    this.loadSubcontractorSelect();
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
