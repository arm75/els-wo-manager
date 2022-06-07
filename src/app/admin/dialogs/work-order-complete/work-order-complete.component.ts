import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../core/models/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ElsWoManagerConstants} from "../../../core/els-wo-manager-constants";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../../../core/services/customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {WorkOrder} from "../../../core/models/work-order";
import {MatSelect} from "@angular/material/select";
import {WorkOrderService} from "../../../core/services/work-order.service";
import {LocationService} from "../../../core/services/location.service";

@Component({
  selector: 'app-work-order-complete',
  templateUrl: './work-order-complete.component.html',
  styleUrls: ['./work-order-complete.component.css']
})
export class WorkOrderCompleteComponent implements OnInit {

  dataLoaded: boolean = false;
  formTitle: string = "Complete Work Order";
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
    private matDialogRef: MatDialogRef<WorkOrderCompleteComponent>,
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
    console.log('entityID:', this.entityId);
    if (this.entityId != null) {
      this.entityService.get(this.entityId)
        .toPromise()
        .then(data => {
          this.entityData = data;
          this.editForm = this.formBuilder.group({
            'id': new FormControl(this.entityData.id),
            'status': new FormControl(this.entityData.status),
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
          //this.dataLoaded = true;
        })
        .catch(error => {
        })
        .finally(() => {
          this.dataLoaded = true;
        });
    }
    //this.dataLoaded = true;
    console.log(this.entityData);
  }

  completeEntity() {
    this.entityService.complete(this.editForm.value)
      .subscribe(data => {
        console.log("Work Order " + this.editForm.value.id + " is COMPLETE.");
        this.matSnackBar.open("Work Order: " + this.editForm.value.id + " is COMPLETE.")
        this.matDialogRef.close();
      }, error => {
        console.log("An error has occurred. Work Order not COMPLETE: " + error);
        this.matSnackBar.open("An error has occurred. Work Order not COMPLETE: " + error);
        this.matDialogRef.close();
      });
  }


}
