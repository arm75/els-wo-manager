import {Component, Input, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-edit-details-tab',
  templateUrl: './edit-details-tab.component.html',
  styleUrls: ['./edit-details-tab.component.css']
})
export class EditDetailsTabComponent implements OnInit {

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

  spinning: boolean = false;

  logNg: boolean = false;


  constructor(
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
  }


  ngOnInit(): void {
  }

  loadWorkOrderIntoView(): void {
    this.entityService.get(this.passedWorkOrderId)
      .toPromise()
      .then(data => { this.entityData = data; })
      .finally(() => {
        //this.loggedInRole = this.loggedInUser?.role;
        //this.nameToDisplay = this.loggedInUser?.username;
        //this.updateFieldBoxes();
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

}
