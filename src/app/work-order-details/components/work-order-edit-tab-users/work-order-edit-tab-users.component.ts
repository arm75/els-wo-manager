import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";
import {WorkOrderService} from "../../../core/services/work-order.service";
import {CustomerService} from "../../../core/services/customer.service";
import {LocationService} from "../../../core/services/location.service";
import {UserService} from "../../../core/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {FormBuilder} from "@angular/forms";
import {WorkOrder} from "../../../core/models/work-order";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-work-order-edit-tab-users',
  templateUrl: './work-order-edit-tab-users.component.html',
  styleUrls: ['./work-order-edit-tab-users.component.css']
})
export class WorkOrderEditTabUsersComponent implements OnInit {

  @Input()
  passedWorkOrderId: any;

  @Output()
  someEvent: EventEmitter<number> = new EventEmitter();

  entityData!: WorkOrder;
  userData!: any;

  @ViewChild('assignedUsersSelect')
  assignedUsersSelect!: MatSelect;
  assignedUsersLoaded: any;
  assignedUsersSelected: any;

  constructor(
    private entityService: WorkOrderService,
    private userService: UserService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private globalSnackBarService: GlobalSnackBarService
  ) { }

  ngOnInit(): void {

    console.log(this.passedWorkOrderId);

    this.loadWorkOrderIntoView();
  }

  loadWorkOrderIntoView(): void {
    this.entityService.get(this.passedWorkOrderId)
      .toPromise()
      .then(data => {
        this.entityData = data;
      })
      .finally(() => {
        this.userData = this.entityData.assignedUsers;
      }
    );
  }

}
