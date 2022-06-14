import {AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/security/authentication.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {WorkOrderTableComponent} from "../../admin/tables/work-order-table/work-order-table.component";
import {
  WorkOrderProcessingTableComponent
} from "../../admin/tables/work-order-processing-table/work-order-processing-table.component";
import {
  WorkOrderHistoryTableComponent
} from "../../admin/tables/work-order-history-table/work-order-history-table.component";
import {WorkOrderUsersTableComponent} from "../tables/work-order-users-table/work-order-users-table.component";
import {ToolEquipmentTableComponent} from "../../admin/tables/tool-equipment-table/tool-equipment-table.component";
import {SubcontractorTableComponent} from "../../admin/tables/subcontractor-table/subcontractor-table.component";
import {
  ToolEquipmentReturnTableComponent
} from "../tables/tool-equipment-return-table/tool-equipment-return-table.component";
import {
  SubcontractorCompletionTableComponent
} from "../tables/subcontractor-completion-table/subcontractor-completion-table.component";

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.css']
})
export class WorkOrdersComponent implements OnInit, OnDestroy {

  loggedInUser!: any;
  loggedInUsername!: string;
  loggedInRole!: string;
  nameToDisplay!: string;
  dataLoaded = false;

  lastTabIndex: number = 0;

  @ViewChild(WorkOrderUsersTableComponent) workOrderUsersTableComponentRef!: WorkOrderUsersTableComponent;
  @ViewChild(ToolEquipmentReturnTableComponent) toolEquipmentReturnTableComponentRef!: ToolEquipmentReturnTableComponent;
  @ViewChild(SubcontractorCompletionTableComponent) subcontractorCompletionTableComponentRef!: SubcontractorCompletionTableComponent;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    //console.table(this.loggedInUser);
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;
  }

  ngOnInit(): void {
    this.setupComponent().finally( () => { this.dataLoaded = true; });
  }

  ngOnDestroy() {
    this.workOrderUsersTableComponentRef.unsubscribeFromRefreshEmitter(true, "Your Work Orders");
    this.toolEquipmentReturnTableComponentRef.unsubscribeFromRefreshEmitter(true, "Tool Equipment Return");
    this.subcontractorCompletionTableComponentRef.unsubscribeFromRefreshEmitter(true, "Subcontractor Completion");
    console.log('all subs unsubbed in Wo-Comp');
  }

  async setupComponent() {
    setTimeout(async () =>{
      await this.firstSubscription();
    }, 1000);
  }

  async firstSubscription() {
    await this.workOrderUsersTableComponentRef.subscribeToRefreshEmitter(true, "Your Work Orders");
  }

  async mainTabSelectedChange(changeEvent: MatTabChangeEvent) {
    switch (changeEvent.index) {
      case 0:
        await this.workOrderUsersTableComponentRef.subscribeToRefreshEmitter(true, "Your Work Orders")
        break;
      case 1:
        await this.toolEquipmentReturnTableComponentRef.subscribeToRefreshEmitter(true, "Tool Equipment Return");
        break;
      case 2:
        await this.subcontractorCompletionTableComponentRef.subscribeToRefreshEmitter(true, "Subcontractor Completion");
        break;
      default:
        break;
    }
    this.lastTabIndex = changeEvent.index;
  }

  async mainTabFocusChange() {
    switch (this.lastTabIndex) {
      case 0:
        await this.workOrderUsersTableComponentRef.unsubscribeFromRefreshEmitter(true, "Your Work Orders");
        break;
      case 1:
        await this.toolEquipmentReturnTableComponentRef.unsubscribeFromRefreshEmitter(true, "Tool Equipment Return");
        break;
      case 2:
        await this.subcontractorCompletionTableComponentRef.unsubscribeFromRefreshEmitter(true, "Subcontractor Completion");
        break;
      default:
        break;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
