import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";
import {WorkOrderService} from "../../../core/services/work-order.service";
import {CustomerService} from "../../../core/services/customer.service";
import {LocationService} from "../../../core/services/location.service";
import {UserService} from "../../../core/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {WorkOrder} from "../../../core/models/work-order";
import {WorkOrderStatus} from "../../../core/types/work-order-status";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {WorkOrderCompleteComponent} from "../../../admin/dialogs/work-order-complete/work-order-complete.component";
import {WorkOrderCloseComponent} from "../../../admin/dialogs/work-order-close/work-order-close.component";
import {WorkOrderCancelComponent} from "../../../admin/dialogs/work-order-cancel/work-order-cancel.component";
import {WorkOrderReopenComponent} from "../../../admin/dialogs/work-order-reopen/work-order-reopen.component";
import {WorkOrderRetryComponent} from "../../../admin/dialogs/work-order-retry/work-order-retry.component";

@Component({
  selector: 'app-notes-completion-tab',
  templateUrl: './notes-completion-tab.component.html',
  styleUrls: ['./notes-completion-tab.component.css']
})
export class NotesCompletionTabComponent implements OnInit {

  loggedInUser!: any;
  loggedInUsername!: string;
  loggedInRole!: string;
  nameToDisplay!: string;

  // for assignedUsers
  userData: any;

  @Input()
  passedWorkOrderId: any;

  @Output()
  statusChangedEvent: EventEmitter<number> = new EventEmitter();

  dataLoaded: boolean = false;
  entityData!: WorkOrder;
  editForm: FormGroup = new FormGroup({});

  // editFormEditMode: boolean = false;

  constructor(
    private snackBarService: GlobalSnackBarService,
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

  ngOnInit(): void {
    this.loadWorkOrderIntoView();
  }

  loadWorkOrderIntoView(): void {
    this.entityService.get(this.passedWorkOrderId)
      .toPromise()
      .then(data => { this.entityData = data; })
      .finally(() => {
        //this.loggedInRole = this.loggedInUser?.role;
        //this.nameToDisplay = this.loggedInUser?.username;
        //this.updateFieldBoxes();
        // this.editForm = this.formBuilder.group({
        //   'id': new FormControl(this.entityData.id),
        //   'status': new FormControl(this.entityData.status),
        //   'customer': new FormControl({ value: this.entityData.customer, disabled: true}, [Validators.required]),
        //   'location': new FormControl({ value: this.entityData.location, disabled: true}, [Validators.required]),
        //   'assignedUsers': new FormControl({ value: this.entityData.assignedUsers, disabled: true}, [Validators.required]),
        //   'quickDescription': new FormControl({ value: this.entityData.quickDescription, disabled: true}, [Validators.required]),
        //   'description': new FormControl({ value: this.entityData.description, disabled: true}),
        //   'contactName': new FormControl({ value: this.entityData.contactName, disabled: true}, [Validators.required]),
        //   'contactPhoneNumb': new FormControl({ value: this.entityData.contactPhoneNumb, disabled: true}, [Validators.required]),
        //   'contactAltPhoneNumb': new FormControl({ value: this.entityData.contactAltPhoneNumb, disabled: true}),
        //   'notes': new FormControl({ value: this.entityData.notes, disabled: true}),
        //   'privateNotes': new FormControl({ value: this.entityData.privateNotes, disabled: true}),
        //   'entryInstruct': new FormControl({ value: this.entityData.entryInstruct, disabled: true}, [Validators.required]),
        //   'inventoryItemsTotal': new FormControl(this.entityData.inventoryItemsTotal),
        //   'laborItemsTotal': new FormControl(this.entityData.laborItemsTotal),
        //   'subcontractorItemsTotal': new FormControl(this.entityData.subcontractorItemsTotal),
        //   'toolEquipmentItemsTotal': new FormControl(this.entityData.toolEquipmentItemsTotal),
        //   'workOrderTotal': new FormControl(this.entityData.workOrderTotal)
        // });

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
          'notes': new FormControl(this.entityData.notes, [Validators.required]),
          'privateNotes': new FormControl(this.entityData.privateNotes),
          'entryInstruct': new FormControl(this.entityData.entryInstruct),
          'inventoryItemsTotal': new FormControl(this.entityData.inventoryItemsTotal),
          'laborItemsTotal': new FormControl(this.entityData.laborItemsTotal),
          'subcontractorItemsTotal': new FormControl(this.entityData.subcontractorItemsTotal),
          'toolEquipmentItemsTotal': new FormControl(this.entityData.toolEquipmentItemsTotal),
          'workOrderTotal': new FormControl(this.entityData.workOrderTotal)
        });

        this.dataLoaded = true;
        //this.loadLocationSelect(this.entityData.customer.id);
        //this.userData = this.entityData.assignedUsers;
        //this.loadAssignedUsersSelect();
      });
  }

  // editModeToggle() {
  //   this.editFormEditMode = !this.editFormEditMode;
  //   if(this.editFormEditMode) { this.editForm.enable(); }
  //   else { this.editForm.disable() }
  // }

  saveWorkOrder() {
    //this.startSpinner();
    // this.editForm.controls['assignedUsers'].setValue(this.userData);
    // this.editForm.controls['inventoryItemsTotal'].setValue(this.masterInventoryTotal);
    // this.editForm.controls['laborItemsTotal'].setValue(this.masterLaborTotal);
    // this.editForm.controls['subcontractorItemsTotal'].setValue(this.masterSubcontractorTotal);
    // this.editForm.controls['toolEquipmentItemsTotal'].setValue(this.masterToolEquipmentTotal);
    // this.editForm.controls['workOrderTotal'].setValue(this.masterTotal);
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        //this.globalSnackBarService.success("Work Order: " + this.editForm.value.id + " has been updated.");
        this.loadWorkOrderIntoView();
        //this.updateFieldBoxes();
        // this.editForm.disable();
        // this.editFormEditMode = false;
      }, error => {
        this.globalSnackBarService.error(error.error.message);
      }, () => {
        //this.stopSpinner();
        this.globalSnackBarService.success("Work Order: " + this.editForm.value.id + " has been updated.");
      });
  }

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
      this.statusChangedEvent.emit(1);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./'], { relativeTo: this.route });
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
      this.statusChangedEvent.emit(1);
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
      this.statusChangedEvent.emit(1);
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
      this.statusChangedEvent.emit(1);
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
      this.statusChangedEvent.emit(1);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./'], { relativeTo: this.route });
    });
  }

}
