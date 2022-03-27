import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { WorkOrderService } from "../../../core/services/work-order.service";
import { MatSelect } from "@angular/material/select";
import { LocationService } from "../../../core/services/location.service";
import { CustomerService } from "../../../core/services/customer.service";
import { map } from "rxjs/operators";
import { UserService } from "../../../core/services/user.service";
import { GlobalSnackBarService } from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-work-order-add',
  templateUrl: './work-order-add.component.html',
  styleUrls: ['./work-order-add.component.css']
})
export class WorkOrderAddComponent implements OnInit {

  formTitle: string = "Add Work Order";
  addForm: FormGroup = new FormGroup({});

  @ViewChild('customerSelect')
  customerSelect!: MatSelect;
  customerLoaded: any;
  customerSelected: any;

  @ViewChild('locationSelect')
  locationSelect!: MatSelect;
  locationLoaded: any;
  locationSelected: any;

  @ViewChild('assignedUserSelect')
  assignedUserSelect!: MatSelect;
  assignedUserLoaded: any;
  assignedUserSelected: any;

  constructor( private matDialogRef: MatDialogRef<WorkOrderAddComponent>,
               private entityService: WorkOrderService,
               private customerService: CustomerService,
               private locationService: LocationService,
               private userService: UserService,
               private formBuilder: FormBuilder,
               private globalSnackBarService: GlobalSnackBarService
  ) {

  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      'quickDescription': new FormControl(''),
      'customerPo': new FormControl(''),
      'customer': new FormControl(''),
      'location': new FormControl(''),
      // 'assignedUsers': new FormControl(''),
      'description': new FormControl(''),
      'entryInstruct': new FormControl(''),
      'inventoryItemsTotal': new FormControl(''),
      'laborItemsTotal': new FormControl(''),
      'subcontractorItemsTotal': new FormControl(''),
      'toolEquipmentItemsTotal': new FormControl(''),
      'workOrderTotal': new FormControl('')
    });
    this.loadCustomerSelect();
    this.loadLocationSelect();
    //this.loadAssignedUserSelect();
  }

  customerSelectChange() {
    this.loadLocationSelect(this.customerSelected);
  }

  locationSelectChange() {
    //alert(this.locationSelected);
  }

  assignedUserSelectChange() {
    //alert(this.locationSelected);
  }

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

  loadAssignedUserSelect() {
    this.userService.getAll().subscribe(
      data => {
        this.assignedUserLoaded = data;
      },error => {
      }
    );
  }

  addEntity() {
    this.entityService.create(this.addForm.value)
      .subscribe(data => {
        this.matDialogRef.close();
        this.globalSnackBarService.success("Work Order added successfully.");
      }, error => {
        this.matDialogRef.close();
        this.globalSnackBarService.error(error.error.message);
      });
  }
}
