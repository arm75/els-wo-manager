import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component, OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/security/authentication.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {CustomerTableComponent} from "../tables/customer-table/customer-table.component";
import {SubcontractorTableComponent} from "../tables/subcontractor-table/subcontractor-table.component";
import {InventoryGroupTableComponent} from "../tables/inventory-group-table/inventory-group-table.component";
import {InventoryLocationTableComponent} from "../tables/inventory-location-table/inventory-location-table.component";
import {LocationTableComponent} from "../tables/location-table/location-table.component";
import {InventoryTableComponent} from "../tables/inventory-table/inventory-table.component";
import {ToolEquipmentTableComponent} from "../tables/tool-equipment-table/tool-equipment-table.component";
import {LaborTableComponent} from "../tables/labor-table/labor-table.component";
import {
  SubcontractorGroupTableComponent
} from "../tables/subcontractor-group-table/subcontractor-group-table.component";
import {UserTableComponent} from "../tables/user-table/user-table.component";
import {WorkOrderTableComponent} from "../tables/work-order-table/work-order-table.component";
import {
  WorkOrderProcessingTableComponent
} from "../tables/work-order-processing-table/work-order-processing-table.component";
import {WorkOrderHistoryTableComponent} from "../tables/work-order-history-table/work-order-history-table.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  loggedInUser!: any;
  loggedInUsername!: string;
  loggedInRole!: string;
  nameToDisplay!: string;

  lastTabIndex: number = 0;
  woLastTabIndex: number = 0;

  @ViewChild(WorkOrderTableComponent) workOrderTableComponentRef!: WorkOrderTableComponent;
  @ViewChild(WorkOrderProcessingTableComponent) workOrderProcessingTableComponentRef!: WorkOrderProcessingTableComponent;
  @ViewChild(WorkOrderHistoryTableComponent) workOrderHistoryTableComponentRef!: WorkOrderHistoryTableComponent;

  @ViewChild(CustomerTableComponent) customerTableComponentRef!: CustomerTableComponent;
  @ViewChild(LocationTableComponent) locationTableComponentRef!: LocationTableComponent;
  @ViewChild(InventoryTableComponent) inventoryTableComponentRef!: InventoryTableComponent;
  @ViewChild(InventoryGroupTableComponent) inventoryGroupTableComponentRef!: InventoryGroupTableComponent;
  @ViewChild(InventoryLocationTableComponent) inventoryLocationTableComponentRef!: InventoryLocationTableComponent;
  @ViewChild(SubcontractorTableComponent) subcontractorTableComponentRef!: SubcontractorTableComponent;
  @ViewChild(SubcontractorGroupTableComponent) subcontractorGroupTableComponentRef!: SubcontractorGroupTableComponent;
  @ViewChild(ToolEquipmentTableComponent) toolEquipmentTableComponentRef!: ToolEquipmentTableComponent;
  @ViewChild(LaborTableComponent) laborTableComponentRef!: LaborTableComponent;
  @ViewChild(UserTableComponent) userTableComponentRef!: UserTableComponent;



  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;
  }

  ngOnInit() {
    //this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    //console.log(this.loggedInUser);
    //this.nameToDisplay = this.loggedInUser.username;
    this.setupComponent().finally( () => { });
  }

  ngOnDestroy() {
    this.destroyComponent().finally( () => { });
    console.log('all subs unsubbed in Admin');
  }

  async setupComponent() {
    setTimeout(async () =>{
      await this.firstSubscription();
    }, 3000);
  }

  async destroyComponent() {
    await this.workOrderTableComponentRef.unsubscribeFromRefreshEmitter(true, "Work Order");
    await this.workOrderProcessingTableComponentRef.unsubscribeFromRefreshEmitter(true, "Work Order Processing");
    await this.workOrderHistoryTableComponentRef.unsubscribeFromRefreshEmitter(true, "Work Order History");
    await this.customerTableComponentRef.unsubscribeFromRefreshEmitter(true, "Customer");
    await this.locationTableComponentRef.unsubscribeFromRefreshEmitter(true, "Location");
    await this.inventoryTableComponentRef.unsubscribeFromRefreshEmitter(true, "Inventory");
    await this.inventoryGroupTableComponentRef.unsubscribeFromRefreshEmitter(true, "Inventory Group");
    await this.inventoryLocationTableComponentRef.unsubscribeFromRefreshEmitter(true, "Inventory Location");
    await this.subcontractorTableComponentRef.unsubscribeFromRefreshEmitter(true, "Subcontractor");
    await this.subcontractorGroupTableComponentRef.unsubscribeFromRefreshEmitter(true, "Subcontractor Group");
    await this.toolEquipmentTableComponentRef.unsubscribeFromRefreshEmitter(true, "Tool Equipment")
    await this.laborTableComponentRef.unsubscribeFromRefreshEmitter(true, "Labor");
    await this.userTableComponentRef.unsubscribeFromRefreshEmitter(true, "User");
  }

  async firstSubscription() {
    await this.workOrderTableComponentRef.subscribeToRefreshEmitter(true, "Work Order In-Progress");
  }

  // myTabFocusChange(changeEvent: MatTabChangeEvent) {
  //   //console.log('Tab position: ' + changeEvent.tab.position);
  //   console.log('Tab position: ' + changeEvent.index);
  // }

  async mainTabSelectedChange(changeEvent: MatTabChangeEvent) {
    switch (changeEvent.index) {
      case 0:
        switch (this.woLastTabIndex) {
          case 0:
            await this.workOrderTableComponentRef.subscribeToRefreshEmitter(true, "Work Order In-Progress");
            break;
          case 1:
            await this.workOrderProcessingTableComponentRef.subscribeToRefreshEmitter(true, "Work Order Processing");
            break;
          case 2:
            await this.workOrderHistoryTableComponentRef.subscribeToRefreshEmitter(true, "Work Order History");
            break;
          default:
            break;
          }
        break;
      case 1:
        await this.customerTableComponentRef.subscribeToRefreshEmitter(true, "Customer");
        break;
      case 2:
        await this.locationTableComponentRef.subscribeToRefreshEmitter(true, "Location");
        break;
      case 3:
        await this.inventoryTableComponentRef.subscribeToRefreshEmitter(true, "Inventory");
        break;
      case 4:
        await this.inventoryGroupTableComponentRef.subscribeToRefreshEmitter(true, "Inventory Group");
        break;
      case 5:
        await this.inventoryLocationTableComponentRef.subscribeToRefreshEmitter(true, "Inventory Location");
        break;
      case 6:
        await this.subcontractorTableComponentRef.subscribeToRefreshEmitter(true, "Subcontractor");
        break;
      case 7:
        await this.subcontractorGroupTableComponentRef.subscribeToRefreshEmitter(true, "Subcontractor Group");
        break;
      case 8:
        await this.toolEquipmentTableComponentRef.subscribeToRefreshEmitter(true, "Tool Equipment")
        break;
      case 9:
        await this.laborTableComponentRef.subscribeToRefreshEmitter(true, "Labor");
        break;
      case 10:
        await this.userTableComponentRef.subscribeToRefreshEmitter(true, "User");
        break;
      default:
        break;
    }
    this.lastTabIndex = changeEvent.index;
  }

  async mainTabFocusChange() {
    switch (this.lastTabIndex) {
      case 0:
        await this.workOrdersTabFocusChange();
        break;
      case 1:
        await this.customerTableComponentRef.unsubscribeFromRefreshEmitter(true, "Customer");
        break;
      case 2:
        await this.locationTableComponentRef.unsubscribeFromRefreshEmitter(true, "Location");
        break;
      case 3:
        await this.inventoryTableComponentRef.unsubscribeFromRefreshEmitter(true, "Inventory");
        break;
      case 4:
        await this.inventoryGroupTableComponentRef.unsubscribeFromRefreshEmitter(true, "Inventory Group");
        break;
      case 5:
        await this.inventoryLocationTableComponentRef.unsubscribeFromRefreshEmitter(true, "Inventory Location");
        break;
      case 6:
        await this.subcontractorTableComponentRef.unsubscribeFromRefreshEmitter(true, "Subcontractor");
        break;
      case 7:
        await this.subcontractorGroupTableComponentRef.unsubscribeFromRefreshEmitter(true, "Subcontractor Group");
        break;
      case 8:
        await this.toolEquipmentTableComponentRef.unsubscribeFromRefreshEmitter(true, "Tool Equipment")
        break;
      case 9:
        await this.laborTableComponentRef.unsubscribeFromRefreshEmitter(true, "Labor");
        break;
      case 10:
        await this.userTableComponentRef.unsubscribeFromRefreshEmitter(true, "User");
        break;
      default:
        break;
    }

  }

  async workOrdersTabSelectedChange(changeEvent: MatTabChangeEvent) {
    switch (changeEvent.index) {
      case 0:
        await this.workOrderTableComponentRef.subscribeToRefreshEmitter(true, "Work Order In-Progress");
        break;
      case 1:
        await this.workOrderProcessingTableComponentRef.subscribeToRefreshEmitter(true, "Work Order Processing");
        break;
      case 2:
        await this.workOrderHistoryTableComponentRef.subscribeToRefreshEmitter(true, "Work Order History");
        break;
      default:
        break;
    }
    this.woLastTabIndex = changeEvent.index;
  }

  async workOrdersTabFocusChange() {
    switch (this.woLastTabIndex) {
      case 0:
        await this.workOrderTableComponentRef.unsubscribeFromRefreshEmitter(true, "Work Order In-Progress");
        break;
      case 1:
        await this.workOrderProcessingTableComponentRef.unsubscribeFromRefreshEmitter(true, "Work Order Processing");
        break;
      case 2:
        await this.workOrderHistoryTableComponentRef.unsubscribeFromRefreshEmitter(true, "Work Order History");
        break;
      default:
        break;
    }
  }

  // myTabSelectedIndexChange(index: number) {
  //   console.log('Selected index: ' + index);
  // }

  // myTabAnimationDone() {
  //   console.log('Animation done.');
  // }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
