import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {WorkOrderService} from "../../../core/services/work-order.service";
import {WorkOrder} from "../../../core/models/work-order";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {WorkOrderUsersAddComponent} from "../../dialogs/work-order-users-add/work-order-users-add.component";
import {WorkOrderUsersEditComponent} from "../../dialogs/work-order-users-edit/work-order-users-edit.component";
import {WorkOrderUsersDeleteComponent} from "../../dialogs/work-order-users-delete/work-order-users-delete.component";
import {UserService} from "../../../core/services/user.service";
import {map} from "rxjs/operators";
import {WorkOrderStatus} from "../../../core/types/work-order-status";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {WorkOrderCompleteComponent} from "../../../admin/dialogs/work-order-complete/work-order-complete.component";
import {WorkOrderCancelComponent} from "../../../admin/dialogs/work-order-cancel/work-order-cancel.component";
import {WorkOrderReopenComponent} from "../../../admin/dialogs/work-order-reopen/work-order-reopen.component";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-work-order-users-table',
  templateUrl: './work-order-users-table.component.html',
  styleUrls: ['./work-order-users-table.component.css']
})
export class WorkOrderUsersTableComponent implements OnInit {

  loggedInUser: any;
  loggedInUsername: any;
  loggedInRole: any;
  nameToDisplay: any;

  displayedColumns: any;
  dataSource: any;
  data: any;
  rightNow = Date.now();
  oneWeeks: number = 604800000;
  twoWeeks: number = 1209600000;

  @ViewChild(MatTable)
  entityTable!: MatTable<WorkOrder>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: WorkOrderService,
    private userService: UserService,
    private _liveAnnouncer: LiveAnnouncer,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;

    this.displayedColumns = ['createdDate', 'id', 'quickDescription', 'customer', 'location',  'status', 'actions'];
  }

  ngOnInit() {
    this.setupComponent().finally(() => console.log("Finished setting up component\n"));
  }

  async setupComponent() {
    // get the table..
    await this.buildTable();
    // configure table
    await this.configTable();
  }

  async buildTable() {
   await this.entityService.getAll()
     .pipe(map(items =>
       items.filter(item => ((
         (item.status == WorkOrderStatus.OPEN) ||
         (item.status == WorkOrderStatus.PENDING)) &&
         (item.assignedUsers.map((thisUser) => thisUser.username)).includes(this.loggedInUsername) ))
       ))
     .toPromise()
     .then(data => { this.data = data })
     .finally( () => { this.dataSource = new MatTableDataSource(this.data) });
  }

  async configTable() {
    this.sort.active = 'createdDate';
    this.sort.direction = 'desc';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    const addDialogRef = this.dialog.open(WorkOrderUsersAddComponent, addDialogConfig);
    await addDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openEditDialog( _id: number) {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.data = { entityId: _id };
    const editDialogRef = this.dialog.open(WorkOrderUsersEditComponent, editDialogConfig);
    await editDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openCompleteDialog( _id: number) {
    const completeDialogConfig = new MatDialogConfig();
    completeDialogConfig.disableClose = true;
    completeDialogConfig.autoFocus = true;
    completeDialogConfig.width = "25%";
    completeDialogConfig.position = { top:  '0' };
    completeDialogConfig.data = { entityId: _id };
    const completeDialogRef = this.dialog.open(WorkOrderCompleteComponent, completeDialogConfig);
    await completeDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openCancelDialog( _id: number) {
    const cancelDialogConfig = new MatDialogConfig();
    cancelDialogConfig.disableClose = true;
    cancelDialogConfig.autoFocus = true;
    cancelDialogConfig.width = "25%";
    cancelDialogConfig.position = { top:  '0' };
    cancelDialogConfig.data = { entityId: _id };
    const cancelDialogRef = this.dialog.open(WorkOrderCancelComponent, cancelDialogConfig);
    await cancelDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openReopenDialog( _id: number) {
    const reOpenDialogConfig = new MatDialogConfig();
    reOpenDialogConfig.disableClose = true;
    reOpenDialogConfig.autoFocus = true;
    reOpenDialogConfig.width = "25%";
    reOpenDialogConfig.position = { top:  '0' };
    reOpenDialogConfig.data = { entityId: _id };
    const reOpenDialogRef = this.dialog.open(WorkOrderReopenComponent, reOpenDialogConfig);
    await reOpenDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.data = { entityId: _id };
    const deleteDialogRef = this.dialog.open(WorkOrderUsersDeleteComponent, deleteDialogConfig);
    await deleteDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

}
