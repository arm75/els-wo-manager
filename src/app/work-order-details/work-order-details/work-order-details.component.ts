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

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.css']
})
export class WorkOrderDetailsComponent implements OnInit {

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
    private entityService: WorkOrderService,
    private customerService: CustomerService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private matSnackBar2: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.getIdFromRoute();
    this.loadCustomerSelect();


    if (this.passedWorkOrderId) {
      console.log("First If=true");
      console.log("entityId: " + this.passedWorkOrderId);
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
             'notes': new FormControl(this.entityData.notes)
           })
           this.dataLoaded = true;
           this.loadLocationSelect(this.entityData.customerId);
           this.editForm.controls['customerId'].setValue(0);
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

  calcMasterTotal() {
    this.masterTotal = this.masterInventoryTotal + this.masterLaborTotal + this.masterSubcontractorTotal + this.masterToolEquipmentTotal;
  }

  getNewInventoryTotal(newTotal: number) {
    this.masterInventoryTotal = newTotal;
    this.calcMasterTotal();
  }

  getNewLaborTotal(newTotal: number) {
    this.masterLaborTotal = newTotal;
    this.calcMasterTotal();
  }

  getNewSubcontractorTotal(newTotal: number) {
    this.masterSubcontractorTotal = newTotal;
    this.calcMasterTotal();
  }

  getNewToolEquipmentTotal(newTotal: number) {
    this.masterToolEquipmentTotal = newTotal;
    this.calcMasterTotal();
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
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        console.log("Work Order " + this.editForm.value.id + " edited successfully.");
        this.matSnackBar2.open("Work Order " + this.editForm.value.id + " edited successfully.");
        //this.matDialogRef.close();
        this.loadWorkOrderIntoView();
        this.updateFieldBoxes();
      }, error => {
        // console.log("An error has occurred. Work Order not edited: " + error);
        this.matSnackBar2.open("An error has occurred. Work Order not edited: " + error);
        //this.matDialogRef.close();
      });

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
