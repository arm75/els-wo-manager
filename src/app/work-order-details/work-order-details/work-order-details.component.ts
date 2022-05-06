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

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.css']
})
export class WorkOrderDetailsComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
// export class WorkOrderDetailsComponent implements OnInit {

  loggedInUser!: any;
  loggedInUsername!: string;
  loggedInRole!: string;
  nameToDisplay!: string;

  // for assignedUsers
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
  woPoFieldBox: any;

  spinning: boolean = false;

  logNg: boolean = false;

  constructor(
    //private snackBarService: GlobalSnackBarService,
    private entityService: WorkOrderService,
    private customerService: CustomerService,
    private locationService: LocationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private globalSnackBarService: GlobalSnackBarService
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;
    console.table(this.loggedInUser);
    console.log("loggedInRole: ", this.loggedInRole, "\n");
    console.log("nameToDisplay: ", this.nameToDisplay, "\n");
  }

  ngOnChanges() {
    if (this.logNg) { console.log("OnChanges ran.\n") }
  }

  ngOnInit(): void {
    if (this.logNg) { console.log("ngOnInit ran.\n") }
    this.dataLoaded = false;
    this.getIdFromRoute();
    this.editFormEditMode = false;
    this.loadCustomerSelect();
    if (this.passedWorkOrderId) {
      this.loadWorkOrderIntoView();
    }
  }

  ngDoCheck() {
    if (this.logNg) { console.log("ngDoCheck ran.\n") }
  }

  ngAfterContentInit() {
    if (this.logNg) { console.log("ngAfterContentInit ran.\n") }
  }

  ngAfterContentChecked() {
    if (this.logNg) { console.log("ngAfterContentChecked ran.\n") }
  }

  ngAfterViewInit() {
    if (this.logNg) { console.log("ngAfterViewInit ran.\n") }
  }

  ngAfterViewChecked() {
    if (this.logNg) { console.log("ngAfterViewChecked ran.\n") }
  }

  ngOnDestroy() {
    if (this.logNg) { console.log("ngOnDestroy ran.\n") }
  }

  addUserToWorkOrder() {
    this.userData.push(this.assignedUsersSelected);
    this.loadAssignedUsersSelect();
    this.assignedUsersSelected = "";
  }

  removeUserFromWorkOrder(userToRemove: User) {
    if (this.userData.length > 1) {
      this.userData = this.userData.filter(function (obj: { id: number; }) {
        return obj.id !== userToRemove.id;
      });
    }
    this.loadAssignedUsersSelect();
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.entityName === o2.entityName && o1.id === o2.id;
  }

  doSomething($event: number) { }

  getIdFromRoute(): void {
    this.route.paramMap.subscribe( params => {
      this.passedWorkOrderId = params.get('passedId');
    });
  }

  loadWorkOrderIntoView(): void {
    this.entityService.get(this.passedWorkOrderId)
      .toPromise()
      .then(data => { this.entityData = data; })
      .finally(() => {
        //this.loggedInRole = this.loggedInUser?.role;
        //this.nameToDisplay = this.loggedInUser?.username;
        this.updateFieldBoxes();
        this.editForm = this.formBuilder.group({
          'id': new FormControl(this.entityData.id),
          'status': new FormControl(this.entityData.status),
          'customer': new FormControl({ value: this.entityData.customer, disabled: true}, [Validators.required]),
          'location': new FormControl({ value: this.entityData.location, disabled: true}, [Validators.required]),
          'assignedUsers': new FormControl({ value: this.entityData.assignedUsers, disabled: true}, [Validators.required]),
          'quickDescription': new FormControl({ value: this.entityData.quickDescription, disabled: true}, [Validators.required]),
          'description': new FormControl({ value: this.entityData.description, disabled: true}),
          'contactName': new FormControl({ value: this.entityData.contactName, disabled: true}, [Validators.required]),
          'contactPhoneNumb': new FormControl({ value: this.entityData.contactPhoneNumb, disabled: true}, [Validators.required]),
          'contactAltPhoneNumb': new FormControl({ value: this.entityData.contactAltPhoneNumb, disabled: true}),
          'notes': new FormControl({ value: this.entityData.notes, disabled: true}),
          'privateNotes': new FormControl({ value: this.entityData.privateNotes, disabled: true}),
          'entryInstruct': new FormControl({ value: this.entityData.entryInstruct, disabled: true}, [Validators.required]),
          'inventoryItemsTotal': new FormControl(this.entityData.inventoryItemsTotal),
          'laborItemsTotal': new FormControl(this.entityData.laborItemsTotal),
          'subcontractorItemsTotal': new FormControl(this.entityData.subcontractorItemsTotal),
          'toolEquipmentItemsTotal': new FormControl(this.entityData.toolEquipmentItemsTotal),
          'workOrderTotal': new FormControl(this.entityData.workOrderTotal)
        });
        this.dataLoaded = true;
        this.loadLocationSelect(this.entityData.customer.id);
        this.userData = this.entityData.assignedUsers;
        this.loadAssignedUsersSelect();
      });
  }

  updateFieldBoxes(): void {
    this.woIdFieldBox = this.entityData.id;
    this.woStatusFieldBox = this.entityData.status;
    this.woCreatedDateFieldBox = this.entityData.createdDate;
    this.woUpdatedDateFieldBox = this.entityData.updatedDate;
    this.woCustomerFieldBox = this.entityData.customer.entityName;
    this.woLocationFieldBox = this.entityData.location.entityName;
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

  customerSelectChange() { this.loadLocationSelect(this.customerSelected.id); }

  locationSelectChange() { }

  assignedUsersSelectChange() { }

  loadCustomerSelect() {
    this.customerService.getAll().subscribe(
      data => {
        this.customerLoaded = data;
      },error => {
      }
    );
  }

  loadLocationSelect(passedCustomerId?: any) {
    if(passedCustomerId) {
      this.locationService.getAll()
        .pipe(map(items =>
          items.filter(item => (item.customer.id == passedCustomerId))))
        .subscribe(data => {
            this.locationLoaded = data;
          }, error => {
          }
        );
    } else {
      this.locationService.getAll()
        .subscribe(data => {
            this.locationLoaded = data;
          }, error => {
          }
        );
    }
  }

  loadAssignedUsersSelect() {
    this.userService.getAll().subscribe(
      data => {
        this.assignedUsersLoaded = data;
        this.assignedUsersLoaded = this.assignedUsersLoaded.filter((ar: { id: number; }) => !this.userData.find((rm: { id: number; }) => (rm.id === ar.id) ));
      },error => {
      }
    );
  }

  editModeToggle() {
    this.editFormEditMode = !this.editFormEditMode;
    if(this.editFormEditMode) { this.editForm.enable(); }
    else { this.editForm.disable() }
  }

  processStatusChange(eventData: number) {
    this.loadWorkOrderIntoView();
  }

  saveWorkOrder() {
    this.startSpinner();
    this.editForm.controls['assignedUsers'].setValue(this.userData);
    this.editForm.controls['inventoryItemsTotal'].setValue(this.masterInventoryTotal);
    this.editForm.controls['laborItemsTotal'].setValue(this.masterLaborTotal);
    this.editForm.controls['subcontractorItemsTotal'].setValue(this.masterSubcontractorTotal);
    this.editForm.controls['toolEquipmentItemsTotal'].setValue(this.masterToolEquipmentTotal);
    this.editForm.controls['workOrderTotal'].setValue(this.masterTotal);
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        //this.globalSnackBarService.success("Work Order: " + this.editForm.value.id + " has been updated.");
        this.loadWorkOrderIntoView();
        this.updateFieldBoxes();
        this.editForm.disable();
        this.editFormEditMode = false;
      }, error => {
        this.globalSnackBarService.error(error.error.message);
      }, () => {
        this.stopSpinner();
        this.globalSnackBarService.success("Work Order: " + this.editForm.value.id + " has been updated.");
      });
  }

  printPage() {
    window.print();
  }

  startSpinner() {
    this.spinning = true;
  }

  stopSpinner() {
    this.spinning = false;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
