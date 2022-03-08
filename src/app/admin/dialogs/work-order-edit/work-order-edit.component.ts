import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { WorkOrderService } from "../../../core/services/work-order.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { WorkOrder } from "../../../core/models/work-order";
import { MatSelect } from "@angular/material/select";
import { CustomerService } from "../../../core/services/customer.service";
import { LocationService } from "../../../core/services/location.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-work-order-edit',
  templateUrl: './work-order-edit.component.html',
  styleUrls: ['./work-order-edit.component.css']
})
export class WorkOrderEditComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Edit Work Order";
  entityId: null;
  entityData!: WorkOrder;
  editForm: FormGroup = new FormGroup({});

  @ViewChild('customerSelect')
  customerSelect!: MatSelect;

  customerLoaded: any;
  customerSelected!: string;

  @ViewChild('locationSelect')
  locationSelect!: MatSelect;

  locationLoaded: any;
  locationSelected!: string;

  constructor( private matDialogRef: MatDialogRef<WorkOrderEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: WorkOrderService,
               private customerService: CustomerService,
               private locationService: LocationService,
               private formBuilder: FormBuilder,
               private matSnackBar: MatSnackBar
  ) {
    this.loadCustomerSelect();
    this.loadLocationSelect();
  }

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
            'quickDescription': new FormControl(this.entityData.quickDescription),
            'status': new FormControl(this.entityData.status),
            'customerPo': new FormControl(this.entityData.customerPo),
            'customerId': new FormControl(this.entityData.customerId),
            'locationId': new FormControl(this.entityData.locationId),
            'description': new FormControl(this.entityData.description),
            'entryInstruct': new FormControl(this.entityData.entryInstruct),
            'inventoryItemsTotal': new FormControl(this.entityData.inventoryItemsTotal),
            'laborItemsTotal': new FormControl(this.entityData.laborItemsTotal),
            'subcontractorItemsTotal': new FormControl(this.entityData.subcontractorItemsTotal),
            'toolEquipmentItemsTotal': new FormControl(this.entityData.toolEquipmentItemsTotal),
            'workOrderTotal': new FormControl(this.entityData.workOrderTotal)
          })
          this.dataLoaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  customerSelectChange() {
    // alert(this.customerSelected);
    this.loadLocationSelect((this.customerSelected));
    //console.log(this.selected);
    // alert("You selected" + this.selected);
  }

  locationSelectChange() {
    //alert(this.locationSelected);
  }

  loadCustomerSelect() {
    this.customerService.getAll().subscribe(
      data => {
        console.log(data);
        this.customerLoaded = data;
      },error => {
        console.log(error);
      }
    );
  }

  loadLocationSelect(passedCustomerId?: any) {
    this.locationService.getAll()
      .pipe(map(items =>
        items.filter(item => (item.customerId == passedCustomerId))))
      .subscribe(
        data => {
          console.log(data);
          this.locationLoaded = data;
        }, error => {
          console.log(error);
        }
      );
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        console.log("Work Order " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar.open("Work Order " + this.editForm.value.id + " edited successfully.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Work Order not edited: " + error);
        this.matSnackBar.open("An error has occurred. Work Order not edited: " + error);
        this.matDialogRef.close();
      });
  }
}
