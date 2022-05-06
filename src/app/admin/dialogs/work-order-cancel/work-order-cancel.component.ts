import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {WorkOrder} from "../../../core/models/work-order";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatSelect} from "@angular/material/select";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WorkOrderService} from "../../../core/services/work-order.service";
import {CustomerService} from "../../../core/services/customer.service";
import {LocationService} from "../../../core/services/location.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-work-order-cancel',
  templateUrl: './work-order-cancel.component.html',
  styleUrls: ['./work-order-cancel.component.css']
})
export class WorkOrderCancelComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Cancel Work Order";
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

  constructor(
    private matDialogRef: MatDialogRef<WorkOrderCancelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entityService: WorkOrderService,
    private customerService: CustomerService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar
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
            //'status': new FormControl(this.entityData.status),
            'customer': new FormControl(this.entityData.customer),
            'location': new FormControl(this.entityData.location),
            'assignedUsers': new FormControl(this.entityData.assignedUsers),
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
        });
    }
    this.dataLoaded = true;
  }

  cancelEntity() {
    this.entityService.cancel(this.editForm.value)
      .subscribe(data => {
        console.log("Work Order " + this.editForm.value.id + " is CANCELLED.");
        this.matSnackBar.open("Work Order: " + this.editForm.value.id + " is CANCELLED.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Work Order not CANCELLED: " + error);
        this.matSnackBar.open("An error has occurred. Work Order not CANCELLED: " + error);
        this.matDialogRef.close();
      });
  }

}
