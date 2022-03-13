import {Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router } from "@angular/router";
import { WorkOrderService } from "../../core/services/work-order.service";
import { WorkOrder } from "../../core/models/work-order";
import { AuthenticationService } from "../../core/security/authentication.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { map } from "rxjs/operators";
import { LocationService } from "../../core/services/location.service";
import { CustomerService } from "../../core/services/customer.service";
import { MatSelect } from "@angular/material/select";
import { GlobalSnackBarService} from "../../shared/snackbar/global-snack-bar.service";
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.css']
})
export class WorkOrderDetailsComponent implements OnInit {

  loggedInUser!: any;
  nameToDisplay!: any;

  @Input()
  passedWorkOrderId: any;

  dataLoaded: boolean = false;
  // entity!: WorkOrder;
  // entityId: null;
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

  masterTotal: number = 0;

  masterInventoryTotal: number = 0;
  masterLaborTotal: number = 0;
  masterSubcontractorTotal: number = 0;
  masterToolEquipmentTotal: number = 0;

  woIdFieldBox: any;
  woStatusFieldBox: any
  woCreatedDateFieldBox: any;
  woUpdatedDateFieldBox: any;
  woCustomerFieldBox: any;
  woLocationFieldBox: any;
  woPoFieldBox: any;

  constructor(
    // private matDialogRef: MatDialogRef<WorkOrderEditComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: any,
    private snackBarService: GlobalSnackBarService,
    private entityService: WorkOrderService,
    private customerService: CustomerService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {

    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    //console.log(this.loggedInUser);
    this.nameToDisplay = this.loggedInUser.username;

    this.dataLoaded = false;
    this.getIdFromRoute();
    this.loadCustomerSelect();

    if (this.passedWorkOrderId) {
      //console.log("First If=true");
      //console.log("entityId: " + this.passedWorkOrderId);
      this.loadWorkOrderIntoView();
    }
  }

  getIdFromRoute(): void {
    this.route.paramMap.subscribe( params => {
      this.passedWorkOrderId = params.get('passedId');
      console.log("Got passed Id: " + this.passedWorkOrderId);
    });
  }

  loadWorkOrderIntoView(): void {
    this.entityService.get(this.passedWorkOrderId)
      .toPromise()
      .then(data => { this.entityData = data; })
      .finally(() => {
           this.updateFieldBoxes();
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
           this.loadLocationSelect(this.entityData.customerId);
           // this.editForm.controls['customerId'].setValue(0);
           this.editForm.controls['customerId'].setValue(this.entityData.customerId);
           this.editForm.controls['locationId'].setValue(this.entityData.locationId);
      });
  }

  updateFieldBoxes(): void {
    this.woIdFieldBox = this.entityData.id;
    this.woStatusFieldBox = this.entityData.status;
    this.woCreatedDateFieldBox = this.entityData.createdDate;
    this.woUpdatedDateFieldBox = this.entityData.updatedDate;
    this.woCustomerFieldBox = this.entityData.customer.entityName;
    this.woLocationFieldBox = this.entityData.location.entityName;
    this.woPoFieldBox = this.entityData.customerPo;


  }

  delayFunction(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  calcMasterTotal() {
    this.masterTotal = this.masterInventoryTotal + this.masterLaborTotal + this.masterSubcontractorTotal + this.masterToolEquipmentTotal;
    this.delayFunction(600);
    this.saveWorkOrder();
  }

  getNewInventoryTotal(newTotal: number) {
    this.masterInventoryTotal = newTotal;
    this.calcMasterTotal();
    // this.saveWorkOrder();
  }

  getNewLaborTotal(newTotal: number) {
    this.masterLaborTotal = newTotal;
    this.calcMasterTotal();
    // this.saveWorkOrder();
  }

  getNewSubcontractorTotal(newTotal: number) {
    this.masterSubcontractorTotal = newTotal;
    this.calcMasterTotal();
    // this.saveWorkOrder();
  }

  getNewToolEquipmentTotal(newTotal: number) {
    this.masterToolEquipmentTotal = newTotal;
    this.calcMasterTotal();
    // this.saveWorkOrder();
  }

  customerSelectChange() {
    // alert(this.customerSelected);
    this.loadLocationSelect(this.customerSelected.valueOf());
    //console.log(this.selected);
    // alert("You selected" + this.selected);
  }

  locationSelectChange() {
    //alert(this.locationSelected);
  }

  loadCustomerSelect() {
    this.customerService.getAll().subscribe(
      data => {
        this.customerLoaded = data;
        console.log("Loaded Customer select:" + this.customerLoaded);
      },error => {
        console.log("Error loading Customer select:" + error);
      }
    );
  }

  loadLocationSelect(passedCustomerId?: any) {
    if(passedCustomerId) {
      this.locationService.getAll()
        .pipe(map(items =>
          items.filter(item => (item.customerId == passedCustomerId))))
        .subscribe(data => {
            this.locationLoaded = data;
            console.log("Loaded Location select:" + this.locationLoaded);
          }, error => {
            console.log("Error loading Location select:" + error);
          }
        );
    } else {
      this.locationService.getAll()
        .subscribe(data => {
            this.locationLoaded = data;
            console.log("Loaded Location select:" + this.locationLoaded);
          }, error => {
            console.log("Error loading Location select:" + error);
          }
        );
    }
  }


  saveWorkOrder() {
    this.editForm.controls['inventoryItemsTotal'].setValue(this.masterInventoryTotal);
    this.editForm.controls['laborItemsTotal'].setValue(this.masterLaborTotal);
    this.editForm.controls['subcontractorItemsTotal'].setValue(this.masterSubcontractorTotal);
    this.editForm.controls['toolEquipmentItemsTotal'].setValue(this.masterToolEquipmentTotal);
    this.editForm.controls['workOrderTotal'].setValue(this.masterTotal);
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        console.log("Work Order " + this.editForm.value.id + " edited successfully.");
        // this.snackBarService.error("This message is ERROR");
        // this.snackBarService.warning("This message is WARNING");
        // this.snackBarService.success("This message is SUCCESS");
        this.matSnackBar.open("Work Order " + this.editForm.value.id + " saved.");
        this.loadWorkOrderIntoView();
        this.updateFieldBoxes();
      }, error => {
        this.matSnackBar.open("An error has occurred. Work Order could not be saved. " + error);
      });

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
