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
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

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
  customerSelected: any;

  @ViewChild('locationSelect')
  locationSelect!: MatSelect;
  locationLoaded: any;
  locationSelected!: any;

  constructor( private matDialogRef: MatDialogRef<WorkOrderEditComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private entityService: WorkOrderService,
               private customerService: CustomerService,
               private locationService: LocationService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
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
            'status': new FormControl(this.entityData.status),
            'customer': new FormControl(this.entityData.customer),
            'customerId': new FormControl(this.entityData.customerId),
            'customerEntityName': new FormControl(this.entityData.customerEntityName),
            'location': new FormControl(this.entityData.location),
            'locationId': new FormControl(this.entityData.locationId),
            'locationEntityName': new FormControl(this.entityData.locationEntityName),
            'assignedUsers': new FormControl(this.entityData.assignedUsers),
            'assignedUsersString': new FormControl(this.entityData.assignedUsersString),
            'quickDescription': new FormControl(this.entityData.quickDescription),
            'description': new FormControl(this.entityData.description),
            'contactName': new FormControl(this.entityData.contactName),
            'contactPhoneNumb': new FormControl(this.entityData.contactPhoneNumb),
            'contactAltPhoneNumb': new FormControl(this.entityData.contactAltPhoneNumb),
            'notes': new FormControl(this.entityData.notes),
            'privateNotes': new FormControl(this.entityData.privateNotes),
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
        }
      );
    }
  }

  customerSelectChange() {
    this.loadLocationSelect(this.customerSelected);
  }

  locationSelectChange() {
  }

  loadCustomerSelect() {
    this.customerService.getAll().subscribe(
      data => {
        console.log(data);
        this.customerLoaded = data;
      },error => {
      }
    );
  }

  loadLocationSelect(passedCustomer?: any) {
    this.locationService.getAll()
      .pipe(map(items =>
        items.filter(item => (item.customer.id == passedCustomer.id))))
      .subscribe(
        data => {
          this.locationLoaded = data;
      }, error => {
      }
    );
  }

  editEntity() {
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Work Order " + this.editForm.value.id + " edited successfully.")
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      }
    );
  }
}
