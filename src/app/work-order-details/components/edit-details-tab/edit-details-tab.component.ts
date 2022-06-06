import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {map} from "rxjs/operators";
import {User} from "../../../core/models/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WorkOrder} from "../../../core/models/work-order";
import {MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {WorkOrderService} from "../../../core/services/work-order.service";
import {CustomerService} from "../../../core/services/customer.service";
import {LocationService} from "../../../core/services/location.service";
import {UserService} from "../../../core/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";
import {UserItemService} from "../../../core/services/user-item.service";

@Component({
  selector: 'app-edit-details-tab',
  templateUrl: './edit-details-tab.component.html',
  styleUrls: ['./edit-details-tab.component.css']
})
export class EditDetailsTabComponent implements OnInit, OnChanges {

  loggedInUser!: any;
  loggedInUsername!: string;
  loggedInRole!: string;
  nameToDisplay!: string;

  userData: any;

  @Input()
  passedWorkOrderId: any;

  @Input()
  passedWorkOrder: any;

  dataLoaded: boolean = false;
  entityData!: WorkOrder;
  editForm: FormGroup = new FormGroup({});

  //editFormEditMode: boolean = false;

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

  spinning: boolean = false;

  logNg: boolean = false;

  @Output()
  saveEvent: EventEmitter<number> = new EventEmitter();


  constructor(
    private entityService: WorkOrderService,
    private customerService: CustomerService,
    private locationService: LocationService,
    private userService: UserService,
    private userItemService: UserItemService,
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
  }


  ngOnInit(): void {
    this.setupComponent().finally(() => {});
    //this.dataLoaded = false;
    //this.getIdFromRoute();
    //this.editFormEditMode = false;

  }

  async setupComponent() {
    await this.loadCustomerSelect();
    if (this.passedWorkOrderId) {
      this.loadWorkOrderIntoView();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges() fired!\n');
    this.entityData = this.passedWorkOrder;
  }

  loadWorkOrderIntoView(): void {
    // this.entityService.get(this.passedWorkOrderId)
    //   .toPromise()
    //   .then(data => { this.entityData = data; })
    //   .finally(() => {

    this.entityData = this.passedWorkOrder;
        this.editForm = this.formBuilder.group({
          'id': new FormControl(this.entityData.id),
          'status': new FormControl(this.entityData.status),
          'customer': new FormControl(this.entityData.customer, [Validators.required]),
          // 'customerId': new FormControl(this.entityData.customerId, [Validators.required]),
          // 'customerEntityName': new FormControl(this.entityData.customerEntityName),
          'location': new FormControl(this.entityData.location, [Validators.required]),
          // 'locationId': new FormControl(this.entityData.locationId, [Validators.required]),
          // 'locationEntityName': new FormControl(this.entityData.locationEntityName),
          'assignedUsers': new FormControl(this.entityData.assignedUsers, [Validators.required]),
          'quickDescription': new FormControl(this.entityData.quickDescription, [Validators.required]),
          'description': new FormControl(this.entityData.description),
          'contactName': new FormControl(this.entityData.contactName),
          'contactEmail': new FormControl(this.entityData.contactEmail),
          'contactPhoneNumb': new FormControl(this.entityData.contactPhoneNumb),
          'contactAltPhoneNumb': new FormControl(this.entityData.contactAltPhoneNumb),
          'notes': new FormControl(this.entityData.notes),
          'privateNotes': new FormControl(this.entityData.privateNotes),
          'entryInstruct': new FormControl(this.entityData.entryInstruct, [Validators.required]),
          'inventoryItemsTotal': new FormControl(this.entityData.inventoryItemsTotal),
          'laborItemsTotal': new FormControl(this.entityData.laborItemsTotal),
          'subcontractorItemsTotal': new FormControl(this.entityData.subcontractorItemsTotal),
          'toolEquipmentItemsTotal': new FormControl(this.entityData.toolEquipmentItemsTotal),
          'workOrderTotal': new FormControl(this.entityData.workOrderTotal)
        });


        this.loadLocationSelect(this.entityData.customer.id);
        this.userData = this.entityData.assignedUsers;
        this.loadAssignedUsersSelect();
        this.dataLoaded = true;
        // });
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

  // loadLocationSelect(passedCustomerId?: any) {
  //   if(passedCustomerId) {
  //     this.locationService.getAll()
  //       .pipe(map(items => items.filter(item => (item.customer.id == passedCustomerId))))
  //       .subscribe(data => {
  //           this.locationLoaded = data;
  //         }, error => {
  //         }
  //       );
  //   } else {
  //     this.locationService.getAll()
  //       .subscribe(data => {
  //           this.locationLoaded = data;
  //         }, error => {
  //         }
  //       );
  //   }
  // }

  loadAssignedUsersSelect() {
    this.userService.getAll().subscribe(
      data => {
        this.assignedUsersLoaded = data;
        this.assignedUsersLoaded = this.assignedUsersLoaded.filter((ar: { id: number; }) => !this.userData.find((rm: { id: number; }) => (rm.id === ar.id) ));
      },error => {
      }
    );
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

  saveWorkOrder() {
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
    this.entityService.update(this.editForm.value)
      .toPromise()
      .then( data => { this.saveEvent.emit(0); })
      .catch( error =>{ this.globalSnackBarService.error(error.error.message); })
      .finally(() => { this.globalSnackBarService.success("Work Order: " + this.editForm.value.id + " has been updated."); });
  }

  printPage() {
    window.print();
  }

}
