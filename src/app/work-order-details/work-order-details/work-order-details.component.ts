import {Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router } from "@angular/router";
import { WorkOrderService } from "../../core/services/work-order.service";
import { WorkOrder } from "../../core/models/work-order";
import { AuthenticationService } from "../../core/security/authentication.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { map } from "rxjs/operators";
import { LocationService } from "../../core/services/location.service";
import { CustomerService } from "../../core/services/customer.service";
import { MatSelect } from "@angular/material/select";
import { GlobalSnackBarService} from "../../shared/snackbar/global-snack-bar.service";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user";

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.css']
})
export class WorkOrderDetailsComponent implements OnInit {
  loggedInUser = this.authenticationService.getUserFromLocalStorage();
  loggedInRole: any;
  nameToDisplay: any;
  userData: any;

  @Input()
  passedWorkOrderId: any;

  dataLoaded: boolean = false;
  entityData!: WorkOrder;
  editForm: FormGroup = new FormGroup({});

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
    private snackBarService: GlobalSnackBarService,
    private entityService: WorkOrderService,
    private customerService: CustomerService,
    private locationService: LocationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.getIdFromRoute();
    this.loadCustomerSelect();

    if (this.passedWorkOrderId) {
      this.loadWorkOrderIntoView();
    }
  }

  addUserToWorkOrder() {
    this.userData.push(this.assignedUsersSelected);
    this.loadAssignedUsersSelect();
  }

  removeUserFromWorkOrder(userToRemove: User) {
    this.userData = this.userData.filter(function( obj: { id: number; } ) {
      return obj.id !== userToRemove.id;
    });
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
        this.loggedInRole = this.loggedInUser?.role;
        this.nameToDisplay = this.loggedInUser?.username;
           this.updateFieldBoxes();
           this.editForm = this.formBuilder.group({
             'id': new FormControl(this.entityData.id),
             'status': new FormControl(this.entityData.status),
             'customerPo': new FormControl(this.entityData.customerPo),
             'customer': new FormControl(this.entityData.customer),
             'location': new FormControl(this.entityData.location),
             'assignedUsers': new FormControl(this.entityData.assignedUsers),
             'quickDescription': new FormControl(this.entityData.quickDescription),
             'description': new FormControl(this.entityData.description),
             'contactName': new FormControl(this.entityData.contactName),
             'contactPhoneNumb': new FormControl(this.entityData.contactPhoneNumb),
             'contactAltPhoneNumb': new FormControl(this.entityData.contactAltPhoneNumb),
             'entryInstruct': new FormControl(this.entityData.entryInstruct),
             'inventoryItemsTotal': new FormControl(this.entityData.inventoryItemsTotal),
             'laborItemsTotal': new FormControl(this.entityData.laborItemsTotal),
             'subcontractorItemsTotal': new FormControl(this.entityData.subcontractorItemsTotal),
             'toolEquipmentItemsTotal': new FormControl(this.entityData.toolEquipmentItemsTotal),
             'workOrderTotal': new FormControl(this.entityData.workOrderTotal)
           })
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

  saveWorkOrder() {
    this.editForm.controls['inventoryItemsTotal'].setValue(this.masterInventoryTotal);
    this.editForm.controls['laborItemsTotal'].setValue(this.masterLaborTotal);
    this.editForm.controls['subcontractorItemsTotal'].setValue(this.masterSubcontractorTotal);
    this.editForm.controls['toolEquipmentItemsTotal'].setValue(this.masterToolEquipmentTotal);
    this.editForm.controls['workOrderTotal'].setValue(this.masterTotal);
    this.entityService.update(this.editForm.value)
      .subscribe(data => {
        this.globalSnackBarService.success("Work Order: " + this.editForm.value.id + " has been updated.");
        this.loadWorkOrderIntoView();
        this.updateFieldBoxes();
      }, error => {
        this.globalSnackBarService.error(error.error.message);
      });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
