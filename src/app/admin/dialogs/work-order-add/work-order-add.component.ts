import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { WorkOrderService } from "../../../core/services/work-order.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-work-order-add',
  templateUrl: './work-order-add.component.html',
  styleUrls: ['./work-order-add.component.css']
})
export class WorkOrderAddComponent implements OnInit {

  formTitle: string = "Add Work Order";

  addForm: FormGroup = new FormGroup({});

  constructor( private matDialogRef: MatDialogRef<WorkOrderAddComponent>,
               private entityService: WorkOrderService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      'status': new FormControl(''),
      // 'physAddress': new FormControl(''),
      // 'physUnit': new FormControl(''),
      // 'physCity': new FormControl(''),
      // 'physState': new FormControl(''),
      // 'physZipCode': new FormControl(''),
      // 'billAddress': new FormControl(''),
      // 'billUnit': new FormControl(''),
      // 'billCity': new FormControl(''),
      // 'billState': new FormControl(''),
      // 'billZipCode': new FormControl(''),
      // 'phoneNumb': new FormControl(''),
      // 'altPhoneNumb': new FormControl(''),
      // 'emailAddress': new FormControl(''),
    });

  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matSnackBar.open("Work Order added successfully.");
        console.log("Work Order added successfully.");
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Work Order not added: " + error);
        this.matSnackBar.open("An error has occurred. Work Order not added: " + error);
        this.matDialogRef.close();
      });
  }

}

