import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { WorkOrderService } from "../../../core/services/work-order.service";
import { MatSelect } from "@angular/material/select";
import { LocationService } from "../../../core/services/location.service";
import { CustomerService } from "../../../core/services/customer.service";
import { map } from "rxjs/operators";
import { UserService } from "../../../core/services/user.service";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";
import {User} from "../../../core/models/user";

@Component({
  selector: 'app-work-order-add',
  templateUrl: './work-order-add.component.html',
  styleUrls: ['./work-order-add.component.css']
})
export class WorkOrderAddComponent implements OnInit {

  formTitle: string = "Add Work Order";
  addForm: FormGroup = new FormGroup({});

  userData: User[] = [];

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

  constructor( private matDialogRef: MatDialogRef<WorkOrderAddComponent>,
               private entityService: WorkOrderService,
               private customerService: CustomerService,
               private locationService: LocationService,
               private userService: UserService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      'customer': new FormControl('', [Validators.required]),
      'customerId': new FormControl(''),
      'customerEntityName': new FormControl(''),
      'location': new FormControl('', [Validators.required]),
      'locationId': new FormControl(''),
      'locationEntityName': new FormControl(''),
      'assignedUsers': new FormControl('', [Validators.required]),
      'assignedUsersString': new FormControl(''),
      'quickDescription': new FormControl('', [Validators.required]),
      'description': new FormControl(''),
      'contactName': new FormControl('', [Validators.required]),
      'contactPhoneNumb': new FormControl('', [Validators.required]),
      'contactAltPhoneNumb': new FormControl(''),
      'notes': new FormControl(''),
      'privateNotes': new FormControl(''),
      'entryInstruct': new FormControl('', [Validators.required]),
      // 'inventoryItemsTotal': new FormControl(''),
      // 'laborItemsTotal': new FormControl(''),
      // 'subcontractorItemsTotal': new FormControl(''),
      // 'toolEquipmentItemsTotal': new FormControl(''),
      // 'workOrderTotal': new FormControl('')
    });
    this.loadCustomerSelect();
    this.loadLocationSelect();
    //this.userData = this.entityData.assignedUsers;
    this.loadAssignedUsersSelect();
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

  customerSelectChange() {
    this.loadLocationSelect(this.customerSelected);
  }

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

  loadLocationSelect(passedCustomer?: any) {
    // if(passedCustomerId) {
      this.locationService.getAll()
        .pipe(map(items =>
          items.filter(item => (item.customer.id == passedCustomer.id))))
        .subscribe(
        data => {
          this.locationLoaded = data;
        }, error => {
        }
      );
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

  addEntity() {
    this.addForm.controls['assignedUsers'].setValue(this.userData);
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Work Order: " + data.id + " been created.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }
}
