import {Component, OnInit, ViewChild} from '@angular/core';
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
export class AdminComponent implements OnInit {

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

  ngOnInit(): void {
    //this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    //console.log(this.loggedInUser);
    this.nameToDisplay = this.loggedInUser.username;

  }

  // myTabFocusChange(changeEvent: MatTabChangeEvent) {
  //   //console.log('Tab position: ' + changeEvent.tab.position);
  //   console.log('Tab position: ' + changeEvent.index);
  // }

  async mainTabSelectedChange(changeEvent: MatTabChangeEvent) {
    //console.log('Index: ' + changeEvent.index);
    switch (changeEvent.index) {
      case 0:
        //console.log("Work Order Tab");
        break;
      case 1:
        //console.log("Customer Tab");
        await this.customerTableComponentRef.subscribeToRefreshEmitter(true, "Customer");
        break;
      case 2:
        //console.log("Locations Tab");
        await this.locationTableComponentRef.subscribeToRefreshEmitter(true, "Location");
        break;
      case 3:
        //console.log("Inventory Tab");
        await this.inventoryTableComponentRef.subscribeToRefreshEmitter(true, "Inventory");
        break;
      case 4:
        //console.log("Inventory Group Tab");
        await this.inventoryGroupTableComponentRef.subscribeToRefreshEmitter(true, "Inventory Group");
        break;
      case 5:
        //console.log("Inventory Locations Tab");
        await this.inventoryLocationTableComponentRef.subscribeToRefreshEmitter(true, "Inventory Location");
        break;
      case 6:
        //console.log("Subcontractor Tab");
        await this.subcontractorTableComponentRef.subscribeToRefreshEmitter(true, "Subcontractor");
        break;
      case 7:
        //console.log("Subcontractor Groups Tab");
        await this.subcontractorGroupTableComponentRef.subscribeToRefreshEmitter(true, "Subcontractor Group");
        break;
      case 8:
        //console.log("Tools/Equipment Tab");
        await this.toolEquipmentTableComponentRef.subscribeToRefreshEmitter(true, "Tool Equipment")
        break;
      case 9:
        //console.log("Labor Tab");
        await this.laborTableComponentRef.subscribeToRefreshEmitter(true, "Labor");
        break;
      case 10:
        //console.log("Users Tab");
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
        //console.log("Work Order Tab");
        break;
      case 1:
        //console.log("Customer Tab");
        await this.customerTableComponentRef.unsubscribeFromRefreshEmitter(true, "Customer");
        break;
      case 2:
        //console.log("Locations Tab");
        await this.locationTableComponentRef.unsubscribeFromRefreshEmitter(true, "Location");
        break;
      case 3:
        //console.log("Inventory Tab");
        await this.inventoryTableComponentRef.unsubscribeFromRefreshEmitter(true, "Inventory");
        break;
      case 4:
        //console.log("Inventory Group Tab");
        await this.inventoryGroupTableComponentRef.unsubscribeFromRefreshEmitter(true, "Inventory Group");
        break;
      case 5:
        //console.log("Inventory Locations Tab");
        await this.inventoryLocationTableComponentRef.unsubscribeFromRefreshEmitter(true, "Inventory Location");
        break;
      case 6:
        //console.log("Subcontractor Tab");
        await this.subcontractorTableComponentRef.unsubscribeFromRefreshEmitter(true, "Subcontractor");
        break;
      case 7:
        //console.log("Subcontractor Groups Tab");
        await this.subcontractorGroupTableComponentRef.unsubscribeFromRefreshEmitter(true, "Subcontractor Group");
        break;
      case 8:
        //console.log("Tools/Equipment Tab");
        await this.toolEquipmentTableComponentRef.unsubscribeFromRefreshEmitter(true, "Tool Equipment")
        break;
      case 9:
        //console.log("Labor Tab");
        await this.laborTableComponentRef.unsubscribeFromRefreshEmitter(true, "Labor");
        break;
      case 10:
        //console.log("Users Tab");
        await this.userTableComponentRef.unsubscribeFromRefreshEmitter(true, "User");
        break;
      default:
        break;
    }

  }

  async workOrdersTabSelectedChange(changeEvent: MatTabChangeEvent) {
    //console.log('Index: ' + changeEvent.index);
    switch (changeEvent.index) {
      case 0:
        //console.log("Work Order Tab");
        await this.workOrderTableComponentRef.subscribeToRefreshEmitter(true, "Work Order");
        break;
      case 1:
        //console.log("Customer Tab");
        await this.workOrderProcessingTableComponentRef.subscribeToRefreshEmitter(true, "Work Order Processing");
        break;
      case 2:
        //console.log("Locations Tab");
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
        //console.log("Work Order Tab");
        await this.workOrderTableComponentRef.unsubscribeFromRefreshEmitter(true, "Work Order");
        break;
      case 1:
        //console.log("Customer Tab");
        await this.workOrderProcessingTableComponentRef.unsubscribeFromRefreshEmitter(true, "Work Order Processing");
        break;
      case 2:
        //console.log("Locations Tab");
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
