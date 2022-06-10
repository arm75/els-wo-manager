import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {WorkOrder} from "../../../core/models/work-order";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatSelect} from "@angular/material/select";
import {ElsWoManagerConstants} from "../../../core/els-wo-manager-constants";
import {WorkOrderService} from "../../../core/services/work-order.service";
import {CustomerService} from "../../../core/services/customer.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {map} from "rxjs/operators";
import {WorkOrderAddComponent} from "../../dialogs/work-order-add/work-order-add.component";
import {WorkOrderEditComponent} from "../../dialogs/work-order-edit/work-order-edit.component";
import {WorkOrderCompleteComponent} from "../../dialogs/work-order-complete/work-order-complete.component";
import {WorkOrderDeleteComponent} from "../../dialogs/work-order-delete/work-order-delete.component";
import {WorkOrderStatus} from "../../../core/types/work-order-status";
import {WorkOrderCloseComponent} from "../../dialogs/work-order-close/work-order-close.component";
import {WorkOrderCancelComponent} from "../../dialogs/work-order-cancel/work-order-cancel.component";
import {WorkOrderReopenComponent} from "../../dialogs/work-order-reopen/work-order-reopen.component";
import {WorkOrderRetryComponent} from "../../dialogs/work-order-retry/work-order-retry.component";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {interval, Subscription} from "rxjs";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-work-order-processing-table',
  templateUrl: './work-order-processing-table.component.html',
  styleUrls: ['./work-order-processing-table.component.css']
})
export class WorkOrderProcessingTableComponent implements OnInit {

  loggedInUser: any;
  loggedInUsername: any;
  loggedInRole: any;
  nameToDisplay: any;

  displayedColumns: any;
  dataSource: any;
  data: any;
  filter: any;

  refreshTimer!: Subscription;

  workOrderFilterSelected: any;
  // dropdownFilterSelected: any;
  dropdownFilterArray: any;

  @ViewChild(MatTable)
  entityTable!: MatTable<WorkOrder>;

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  @ViewChild('workOrderFilterSelect')
  workOrderFilterSelect!: MatSelect;

  constructor(
    private entityService: WorkOrderService,
    private customerService: CustomerService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;

    this.workOrderFilterSelected = 'ALL';
    this.dropdownFilterArray = ElsWoManagerConstants.processingWorkOrderStatusFilterArray;
    this.displayedColumns = ['createdDate', 'id', 'quickDescription', 'customer', 'location', 'status', 'workOrderTotal', 'actions'];
  }

  ngOnInit(): void {
    this.buildTable();
  }

  async setupComponent() {
    // get the table..
    await this.buildTable();
    // configure table
    await this.configTable();
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

  buildTable() {
    switch(this.workOrderFilterSelected) {
      case 'ALL': {
        this.entityService.getAll()
          .pipe(map(items =>
            items.filter(item => ( (item.status == WorkOrderStatus.COMPLETE) || (item.status == WorkOrderStatus.CLOSED) || (item.status == WorkOrderStatus.ERROR) || (item.status == WorkOrderStatus.RETRY) ))))
          .subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
            this.sort.active = 'createdDate';
            this.sort.direction = 'desc';
            this.dataSource.sort = this.sort;
            //this.dataSource.paginator = this.paginator;
          });
        break;
      }
      default: {
        this.entityService.getAll()
          .pipe(map(items =>
            items.filter(item => ((item.status == this.workOrderFilterSelected)))))
          .subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
            this.sort.active = 'createdDate';
            this.sort.direction = 'desc';
            this.dataSource.sort = this.sort;
            //this.dataSource.paginator = this.paginator;
          });
        break;
      }
    }
  }

  async configTable() {
    this.sort.active = 'entityName';
    this.sort.direction = 'asc';
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

  selectChange() {
    this.buildTable();
  }

  applyFilter(event: Event) {
    const filterTarget = (event.target as HTMLInputElement).value;
    if (filterTarget) { this.dataSource.filter = filterTarget.trim().toLowerCase(); }
  }

  clearFilter() {
    this.dataSource.filter = '';
    this.filter = '';
    this.workOrderFilterSelected = 'ALL';
    this.selectChange();
  }

  openAddDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    addDialogConfig.width = "40%";
    addDialogConfig.position = { top:  '0' };
    const addDialogRef = this.dialog.open(WorkOrderAddComponent, addDialogConfig);
    addDialogRef.afterClosed().subscribe(addData => {
      this.buildTable();
    });
  }

  openEditDialog( _id: number) {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.width = "40%";
    editDialogConfig.position = { top:  '0' };
    editDialogConfig.data = { entityId: _id };
    const editDialogRef = this.dialog.open(WorkOrderEditComponent, editDialogConfig);
    editDialogRef.afterClosed().subscribe(editData => {
      this.buildTable();
    });
  }

  openCompleteDialog( _id: number) {
    const completeDialogConfig = new MatDialogConfig();
    completeDialogConfig.disableClose = true;
    completeDialogConfig.autoFocus = true;
    completeDialogConfig.width = "25%";
    completeDialogConfig.position = { top:  '0' };
    completeDialogConfig.data = { entityId: _id };
    const completeDialogRef = this.dialog.open(WorkOrderCompleteComponent, completeDialogConfig);
    completeDialogRef.afterClosed().subscribe(completeData => {
      this.buildTable();
    });
  }

  openCloseDialog( _id: number) {
    const closeDialogConfig = new MatDialogConfig();
    closeDialogConfig.disableClose = true;
    closeDialogConfig.autoFocus = true;
    closeDialogConfig.width = "25%";
    closeDialogConfig.position = { top:  '0' };
    closeDialogConfig.data = { entityId: _id };
    const closeDialogRef = this.dialog.open(WorkOrderCloseComponent, closeDialogConfig);
    closeDialogRef.afterClosed().subscribe(closeData => {
      this.buildTable();
    });
  }

  openCancelDialog( _id: number) {
    const cancelDialogConfig = new MatDialogConfig();
    cancelDialogConfig.disableClose = true;
    cancelDialogConfig.autoFocus = true;
    cancelDialogConfig.width = "25%";
    cancelDialogConfig.position = { top:  '0' };
    cancelDialogConfig.data = { entityId: _id };
    const cancelDialogRef = this.dialog.open(WorkOrderCancelComponent, cancelDialogConfig);
    cancelDialogRef.afterClosed().subscribe(cancelData => {
      this.buildTable();
    });
  }

  openReopenDialog( _id: number) {
    const reOpenDialogConfig = new MatDialogConfig();
    reOpenDialogConfig.disableClose = true;
    reOpenDialogConfig.autoFocus = true;
    reOpenDialogConfig.width = "25%";
    reOpenDialogConfig.position = { top:  '0' };
    reOpenDialogConfig.data = { entityId: _id };
    const reOpenDialogRef = this.dialog.open(WorkOrderReopenComponent, reOpenDialogConfig);
    reOpenDialogRef.afterClosed().subscribe(reOpenData => {
      this.buildTable();
    });
  }

  openRetryDialog( _id: number) {
    const reTryDialogConfig = new MatDialogConfig();
    reTryDialogConfig.disableClose = true;
    reTryDialogConfig.autoFocus = true;
    reTryDialogConfig.width = "25%";
    reTryDialogConfig.position = { top:  '0' };
    reTryDialogConfig.data = { entityId: _id };
    const reTryDialogRef = this.dialog.open(WorkOrderRetryComponent, reTryDialogConfig);
    reTryDialogRef.afterClosed().subscribe(reTryData => {
      this.buildTable();
    });
  }

  openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.width = "25%";
    deleteDialogConfig.position = { top:  '0' };
    deleteDialogConfig.data = { entityId: _id };
    const deleteDialogRef = this.dialog.open(WorkOrderDeleteComponent, deleteDialogConfig);
    deleteDialogRef.afterClosed().subscribe(deleteData => {
      this.buildTable();
    });
  }

}
