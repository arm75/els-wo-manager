import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ToolEquipmentItem} from "../../../core/models/tool-equipment-item";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ToolEquipmentItemService} from "../../../core/services/tool-equipment-item.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ToolEquipmentItemAddComponent} from "../../../work-order-details/dialogs/tool-equipment-item-add/tool-equipment-item-add.component";
import {ToolEquipmentItemEditComponent} from "../../../work-order-details/dialogs/tool-equipment-item-edit/tool-equipment-item-edit.component";
import {ToolEquipmentItemDeleteComponent} from "../../../work-order-details/dialogs/tool-equipment-item-delete/tool-equipment-item-delete.component";
import {ToolEquipmentItemReturnComponent} from "../../../work-order-details/dialogs/tool-equipment-item-return/tool-equipment-item-return.component";
import {map} from "rxjs/operators";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {WorkOrderService} from "../../../core/services/work-order.service";
import {WorkOrder} from "../../../core/models/work-order";
import {WorkOrderStatus} from "../../../core/types/work-order-status";
import {interval, Subscription} from "rxjs";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-tool-equipment-return-table',
  templateUrl: './tool-equipment-return-table.component.html',
  styleUrls: ['./tool-equipment-return-table.component.css']
})
export class ToolEquipmentReturnTableComponent implements OnInit {

  loggedInUser: any;
  loggedInUsername: any;
  loggedInRole: any;
  nameToDisplay: any;

  dataSource: any;
  data: any;
  workOrdersToShow: any;
  componentTotal: any;
  displayedColumns: any;
  rightNow = Date.now();
  oneWeeks: number = 604800000;
  twoWeeks: number = 1209600000;

  refreshTimer!: Subscription;

  @Input()
  passedWorkOrderId: any;

  @Output()
  totalChangedEvent: EventEmitter<number> = new EventEmitter();

  @ViewChild(MatTable)
  entityTable!: MatTable<ToolEquipmentItem>;

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: ToolEquipmentItemService,
    private workOrderService: WorkOrderService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;

    this.displayedColumns = ['createdDate', 'entityName', 'workOrder', 'notes', 'days', 'status', 'actions'];
    if((this.loggedInRole=='ROLE_ADMIN')||(this.loggedInRole=='ROLE_SUPER_ADMIN')) {
      this.displayedColumns = ['createdDate', 'entityName', 'workOrder', 'notes', 'pricePerDay', 'days', 'totalPrice', 'status', 'actions'];
    }
  }

  ngOnInit() {
    this.setupComponent().finally(() => {});
  }

  async setupComponent() {
    // get an array of the IDs, of the work orders to show...
    await this.getWorkOrdersToShow();
    // get the table data, but only from the IDs in workOrdersToShow..,
    await this.buildTable();
    // configure the table...
    await this.configTable();
    // sum the items' totals...
    await this.data.forEach((item: { totalPrice: number; }) => this.componentTotal += item.totalPrice);
    // run the first changed event, to get the total...
    this.totalChangedEvent.emit(this.componentTotal);
  }

  async subscribeToRefreshEmitter(log?: boolean, tabName?: string) {
    await this.refreshTable();
    this.refreshTimer = interval(environment.refreshInterval).subscribe(async (data: number)=>{
      if (log) { console.log(tabName, "refresh event:", data); }
      await this.refreshTable();
    });
  }

  async unsubscribeFromRefreshEmitter(log?: boolean, tabName?: string) {
    if (log) { console.log("Unsubscribe from", tabName, "refresh."); }
    if(this.refreshTimer) {
      this.refreshTimer.unsubscribe();
    }
  }

  async getWorkOrdersToShow() {
    // get the user's open and pending work orders, and map them to an array of those work orders' id's
    await this.workOrderService.getAll()
      .pipe(map((items: WorkOrder[]) => items.filter(
        (item: WorkOrder) => ((
          (item.status == WorkOrderStatus.OPEN) ||
          (item.status == WorkOrderStatus.PENDING)) &&
          (item.assignedUsers.map((thisUser) => thisUser.username)).includes(this.loggedInUsername) ))
      ))
      .pipe(map((items: WorkOrder[]) => items.map((item: WorkOrder) => item.id)))
      .toPromise()
      .then(data => { this.workOrdersToShow = data });
  }

  async buildTable() {
    this.componentTotal = 0;
    await this.entityService.getAll()
      .pipe(map(items =>
        items.filter(item => ((item.status == "OUT") && (this.workOrdersToShow.includes(item.workOrder.id))))))
      .toPromise()
      .then(data => { this.data = data })
      .finally(() => { this.dataSource = new MatTableDataSource(this.data) });
  }

  async configTable() {
    this.sort.active = 'createdDate';
    this.sort.direction = 'desc';
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  async refreshTable() {
    this.sort = this.dataSource.sort;
    //this.paginator = this.dataSource.paginator;
    // get the table..
    await this.buildTable();
    // configure table
    await this.refreshConfigTable();
  }

  async refreshConfigTable() {
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterTarget = (event.target as HTMLInputElement).value;
    if (filterTarget) { this.dataSource.filter = filterTarget.trim().toLowerCase() }
  }

  getRowAgeColor(datePassed: any) {
    let dateToCompare = Date.parse(datePassed);
    let time = this.rightNow - dateToCompare;
    if((time >= this.oneWeeks)&&(time < this.twoWeeks)) { return 'is-orange'; }
    if(time >= this.twoWeeks) { return 'is-red'; }
    return;
  }

  async openAddDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    addDialogConfig.width = "40%";
    addDialogConfig.position = { top:  '0' };
    addDialogConfig.data = { woId: this.passedWorkOrderId };
    const addDialogRef = this.dialog.open(ToolEquipmentItemAddComponent, addDialogConfig);
    await addDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openEditDialog( _id: number) {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.width = "40%";
    editDialogConfig.position = { top:  '0' };
    editDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const editDialogRef = this.dialog.open(ToolEquipmentItemEditComponent, editDialogConfig);
    await editDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openReturnItemDialog(_id: number) {
    const returnDialogConfig = new MatDialogConfig();
    returnDialogConfig.disableClose = true;
    returnDialogConfig.autoFocus = true;
    returnDialogConfig.width = "25%";
    returnDialogConfig.position = { top:  '0' };
    returnDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const returnDialogRef = this.dialog.open(ToolEquipmentItemReturnComponent, returnDialogConfig);
    await returnDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.width = "25%";
    deleteDialogConfig.position = { top:  '0' };
    deleteDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const deleteDialogRef = this.dialog.open(ToolEquipmentItemDeleteComponent, deleteDialogConfig);
    await deleteDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

}
