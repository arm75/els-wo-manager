import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { WorkOrderService } from "../../core/services/work-order.service";
import { WorkOrder } from "../../core/models/work-order";
import { AuthenticationService } from "../../core/security/authentication.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { map } from "rxjs/operators";
import { LocationService } from "../../core/services/location.service";
import { CustomerService } from "../../core/services/customer.service";
import { MatSelect } from "@angular/material/select";
import { GlobalSnackBarService } from "../../shared/snackbar/global-snack-bar.service";
import { UserService } from "../../core/services/user.service";
import { User } from "../../core/models/user";
import { MatInput } from "@angular/material/input";
import {interval} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {WorkOrderCompleteComponent} from "../../admin/dialogs/work-order-complete/work-order-complete.component";
import {WorkOrderCloseComponent} from "../../admin/dialogs/work-order-close/work-order-close.component";
import {WorkOrderCancelComponent} from "../../admin/dialogs/work-order-cancel/work-order-cancel.component";
import {WorkOrderReopenComponent} from "../../admin/dialogs/work-order-reopen/work-order-reopen.component";
import {WorkOrderRetryComponent} from "../../admin/dialogs/work-order-retry/work-order-retry.component";

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.css']
})
export class WorkOrderDetailsComponent implements OnInit {

  params: any;

  loggedInUser!: any;
  loggedInUsername!: string;
  loggedInRole!: string;
  nameToDisplay!: string;

  userData: any;

  @Input()
  passedWorkOrderId: any;

  dataLoaded: boolean = false;
  entityData!: WorkOrder;
  editForm: FormGroup = new FormGroup({});
  editFormEditMode: boolean = false;

  @ViewChild('customerSelect')
  customerSelect!: MatSelect;
  customerLoaded: any;
  customerSelected: any;

  @ViewChild('locationSelect')
  locationSelect!: MatSelect;
  locationLoaded: any;
  locationSelected: any;

  @ViewChild('assignedUsersSelect')
  assignedUsersSelect!: MatSelect;
  assignedUsersLoaded: any;
  assignedUsersSelected: any;

  @ViewChild('quickDescriptionInput')
  quickDescriptionInput!: MatInput;

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

  // spinning: boolean = false;
  //
  // logNg: boolean = false;

  // obs test
  timerEvent: number = 0;

  constructor(
    private entityService: WorkOrderService,
    private customerService: CustomerService,
    private locationService: LocationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private globalSnackBarService: GlobalSnackBarService,
    private dialog: MatDialog
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;
  }

  ngOnInit() {
    this.setupComponent().finally(() => {});
  }

  async setupComponent() {
    // console.log('before getIdFromRoute');
    await this.getIdFromRoute();
    // console.log('after getIdFromRoute');
    // this.dataLoaded = true;
    if (this.passedWorkOrderId) {
      // console.log('inside if:', this.passedWorkOrderId);
      await this.loadWorkOrderIntoView();
      // console.log('inside if: ', this.entityData);
    }
    this.dataLoaded = true;
    await this.updateFieldBoxes();
    await this.loadCustomerSelect();
    const custId = this.entityData.customer.id;
    await this.loadLocationSelect(custId).finally(()=>{});

    this.userData = this.entityData.assignedUsers;
    await this.loadAssignedUsersSelect();
  }

  async loadWorkOrderIntoView() {
    await this.entityService.get(this.passedWorkOrderId)
      .toPromise()
      .then(data => { this.entityData = data; })
      .finally(() => {
        this.editForm = this.formBuilder.group({
          'id': new FormControl(this.entityData.id),
          'status': new FormControl(this.entityData.status),
          'customer': new FormControl(this.entityData.customer, [Validators.required]),
          'location': new FormControl(this.entityData.location, [Validators.required]),
          'assignedUsers': new FormControl(this.entityData.assignedUsers, [Validators.required]),
          'quickDescription': new FormControl(this.entityData.quickDescription, [Validators.required]),
          'description': new FormControl(this.entityData.description),
          'contactName': new FormControl(this.entityData.contactName),
          'contactEmail': new FormControl(this.entityData.contactEmail),
          'contactPhoneNumb': new FormControl(this.entityData.contactPhoneNumb),
          'contactAltPhoneNumb': new FormControl(this.entityData.contactAltPhoneNumb),
          'notes': new FormControl(this.entityData.notes, [Validators.required]),
          'privateNotes': new FormControl(this.entityData.privateNotes),
          'entryInstruct': new FormControl(this.entityData.entryInstruct, [Validators.required]),
          'inventoryItemsTotal': new FormControl(this.entityData.inventoryItemsTotal),
          'laborItemsTotal': new FormControl(this.entityData.laborItemsTotal),
          'subcontractorItemsTotal': new FormControl(this.entityData.subcontractorItemsTotal),
          'toolEquipmentItemsTotal': new FormControl(this.entityData.toolEquipmentItemsTotal),
          'workOrderTotal': new FormControl(this.entityData.workOrderTotal)
        });
      });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.entityName === o2.entityName && o1.id === o2.id;
  }

  async getIdFromRoute() {
    this.route.paramMap.subscribe(params => {
      this.passedWorkOrderId = params.get('passedId');
    });
  }

  async updateFieldBoxes() {
    this.woIdFieldBox = this.entityData.id;
    this.woStatusFieldBox = this.entityData.status;
    this.woCreatedDateFieldBox = this.entityData.createdDate;
    this.woUpdatedDateFieldBox = this.entityData.updatedDate;
    this.woCustomerFieldBox = this.entityData.customer.entityName;
    this.woLocationFieldBox = this.entityData.location.entityName;
  }

  async calcMasterTotal() {
    this.masterTotal = this.masterInventoryTotal + this.masterLaborTotal + this.masterSubcontractorTotal + this.masterToolEquipmentTotal;
  }

  async getNewInventoryTotal(newTotal: number) {
    this.masterInventoryTotal = newTotal;
    await this.calcMasterTotal();
    await this.processSaveEvent();
  }

  async getNewLaborTotal(newTotal: number) {
    this.masterLaborTotal = newTotal;
    await this.calcMasterTotal();
    await this.processSaveEvent();
  }

  async getNewSubcontractorTotal(newTotal: number) {
    this.masterSubcontractorTotal = newTotal;
    await this.calcMasterTotal();
    await this.processSaveEvent();
  }

  async getNewToolEquipmentTotal(newTotal: number) {
    this.masterToolEquipmentTotal = newTotal;
    await this.calcMasterTotal();
    await this.processSaveEvent();
  }

  async processSaveEvent() {
    await this.loadWorkOrderIntoView();
    await this.updateFieldBoxes();
  }

  processStatusChange(eventData: number) {
    this.loadWorkOrderIntoView().finally();
  }

  async addUserToWorkOrder() {
    this.userData.push(this.assignedUsersSelected);
    await this.loadAssignedUsersSelect();
    this.assignedUsersSelected = "";
  }

  async removeUserFromWorkOrder(userToRemove: User) {
    if (this.userData.length > 1) {
      this.userData = this.userData.filter(function (obj: { id: number; }) {
        return obj.id !== userToRemove.id;
      });
    }
    await this.loadAssignedUsersSelect();
  }

  async loadCustomerSelect() {
    await this.customerService.getAll()
      .toPromise()
      .then(data => { this.customerLoaded = data; });
  }

  async loadLocationSelect(passedCustomerId?: any) {
    if(passedCustomerId) {
      await this.locationService.getAll().pipe(map(items => items.filter(item => (item.customer.id == passedCustomerId))))
        .toPromise()
        .then(data => { this.locationLoaded = data; })
        .catch(error =>  { })
        .finally(()=>{});
    } else {
      await this.locationService.getAll()
        .toPromise()
        .then(data => { this.locationLoaded = data; })
        .catch(error =>  { })
        .finally(()=>{});
    }
  }

  async loadAssignedUsersSelect() {
    await this.userService.getAll().toPromise()
      .then(data=>{ this.assignedUsersLoaded = data; })
      .finally(()=>{ this.assignedUsersLoaded = this.assignedUsersLoaded.filter((ar: { id: number; }) => !this.userData.find((rm: { id: number; }) => (rm.id === ar.id) )); });
  }

  async customerSelectChange() {
    //this.editForm.controls['customerEntityName'].setValue(this.entityData.customer.entityName);
    await this.loadLocationSelect(this.customerSelected.id);
    this.editForm.controls['location'].reset();
    this.editForm.controls['location'].markAsTouched();

    // this.editForm.controls['location'].clearValidators();
    //this.editForm.controls['location'].updateValueAndValidity();
    //
    //this.locationSelect.value = null;
    //this.locationSelected = null;
  }

  async locationSelectChange() {
    //this.editForm.controls['locationEntityName'].setValue(this.entityData.location.entityName);
  }

  assignedUsersSelectChange() { }

  openCompleteDialog( _id: number) {
    const completeDialogConfig = new MatDialogConfig();
    completeDialogConfig.disableClose = true;
    completeDialogConfig.autoFocus = true;
    completeDialogConfig.width = "25%";
    completeDialogConfig.position = { top:  '0' };
    completeDialogConfig.data = { entityId: _id };
    const completeDialogRef = this.dialog.open(WorkOrderCompleteComponent, completeDialogConfig);
    completeDialogRef.afterClosed().subscribe(completeData => {
      //this.buildTable();
      console.log('completeData:', completeData);
      if(completeData==true) {
        //this.statusChangedEvent.emit(1);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['./'], {relativeTo: this.route});
      }
    });
  }

  openCloseDialog( _id: number) {
    const closeDialogConfig = new MatDialogConfig();
    closeDialogConfig.disableClose = true;
    closeDialogConfig.autoFocus = true;
    closeDialogConfig.width = "25%";
    closeDialogConfig.position = { top:  '0' };
    closeDialogConfig.data = { entityId: _id };
    const closeDialogRef = this.dialog.open(WorkOrderCloseComponent, closeDialogConfig);
    closeDialogRef.afterClosed().subscribe(closeData => {
      //this.buildTable();
      //this.statusChangedEvent.emit(1);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./'], { relativeTo: this.route });
    });
  }

  openCancelDialog( _id: number) {
    const cancelDialogConfig = new MatDialogConfig();
    cancelDialogConfig.disableClose = true;
    cancelDialogConfig.autoFocus = true;
    cancelDialogConfig.width = "25%";
    cancelDialogConfig.position = { top:  '0' };
    cancelDialogConfig.data = { entityId: _id };
    const cancelDialogRef = this.dialog.open(WorkOrderCancelComponent, cancelDialogConfig);
    cancelDialogRef.afterClosed().subscribe(cancelData => {
      //this.statusChangedEvent.emit(1);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./'], { relativeTo: this.route });
    });
  }

  openReopenDialog( _id: number) {
    const reOpenDialogConfig = new MatDialogConfig();
    reOpenDialogConfig.disableClose = true;
    reOpenDialogConfig.autoFocus = true;
    reOpenDialogConfig.width = "25%";
    reOpenDialogConfig.position = { top:  '0' };
    reOpenDialogConfig.data = { entityId: _id };
    const reOpenDialogRef = this.dialog.open(WorkOrderReopenComponent, reOpenDialogConfig);
    reOpenDialogRef.afterClosed().subscribe(reOpenData => {
      //this.statusChangedEvent.emit(1);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./'], { relativeTo: this.route });
    });
  }

  openRetryDialog( _id: number) {
    const reTryDialogConfig = new MatDialogConfig();
    reTryDialogConfig.disableClose = true;
    reTryDialogConfig.autoFocus = true;
    reTryDialogConfig.width = "25%";
    reTryDialogConfig.position = { top:  '0' };
    reTryDialogConfig.data = { entityId: _id };
    const reTryDialogRef = this.dialog.open(WorkOrderRetryComponent, reTryDialogConfig);
    reTryDialogRef.afterClosed().subscribe(reTryData => {
      //this.statusChangedEvent.emit(1);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./'], { relativeTo: this.route });
    });
  }

  async saveWorkOrder() {
    // this.editForm.controls['customerId'].setValue(this.entityData.customer.id);
    // this.editForm.controls['customerEntityName'].setValue(this.entityData.customer.entityName);
    // this.editForm.controls['locationId'].setValue(this.entityData.location.id);
    // this.editForm.controls['locationEntityName'].setValue(this.entityData.location.entityName);
    this.editForm.controls['assignedUsers'].setValue(this.userData);
    this.editForm.controls['inventoryItemsTotal'].setValue(this.masterInventoryTotal);
    this.editForm.controls['laborItemsTotal'].setValue(this.masterLaborTotal);
    this.editForm.controls['subcontractorItemsTotal'].setValue(this.masterSubcontractorTotal);
    this.editForm.controls['toolEquipmentItemsTotal'].setValue(this.masterToolEquipmentTotal);
    this.editForm.controls['workOrderTotal'].setValue(this.masterTotal);
    await this.entityService.update(this.editForm.value)
      .toPromise()
      .catch( error =>{ this.globalSnackBarService.error(error.error.message); })
      .finally(() => { this.globalSnackBarService.success("Work Order: " + this.editForm.value.id + " has been updated."); });
    // console.log('entityData: ', this.entityData);
    // console.log('editForm: ', this.editForm);
    await this.loadWorkOrderIntoView();
    await this.updateFieldBoxes();
  }

  printPage() {
    window.print();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
