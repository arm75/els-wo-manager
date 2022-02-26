import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { SubcontractorItemService } from "../../../core/services/subcontractor-item.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSelect } from "@angular/material/select";
import { SubcontractorService } from "../../../core/services/subcontractor.service";

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
  subcontractorSelected!: string;

  constructor( private matDialogRef: MatDialogRef<SubcontractorItemAddComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: SubcontractorItemService,
               private subcontractorService: SubcontractorService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadSubcontractorSelect();
  }

  ngOnInit() {
    this.woId = this.data.woId;
    this.addForm = this.formBuilder.group({
      'subcontractorId': new FormControl(''),
      'workOrderId': new FormControl(this.woId),
      'notes': new FormControl(''),
      'unitPrice': new FormControl(''),
      'qty': new FormControl(''),
    });
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

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Subcontractor Item added successfully.");
        console.log("Subcontractor Item added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Subcontractor Item not added: " + error);
        this.matSnackBar.open("An error has occurred. Subcontractor Item not added: " + error);
        this.matDialogRef.close();
      });
  }
}
