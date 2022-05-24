import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SubcontractorItem} from "../../../core/models/subcontractor-item";
import {SubcontractorItemService} from "../../../core/services/subcontractor-item.service";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {map} from "rxjs/operators";
import {SubcontractorItemAddComponent} from "../../../work-order-details/dialogs/subcontractor-item-add/subcontractor-item-add.component";
import {SubcontractorItemEditComponent} from "../../../work-order-details/dialogs/subcontractor-item-edit/subcontractor-item-edit.component";
import {SubcontractorItemCompleteComponent} from "../../../work-order-details/dialogs/subcontractor-item-complete/subcontractor-item-complete.component";
import {SubcontractorItemDeleteComponent} from "../../../work-order-details/dialogs/subcontractor-item-delete/subcontractor-item-delete.component";
import {WorkOrder} from "../../../core/models/work-order";
import {WorkOrderStatus} from "../../../core/types/work-order-status";
import {WorkOrderService} from "../../../core/services/work-order.service";
import {GlobalSnackBarService} from "../../../shared/snackbar/global-snack-bar.service";

@Component({
  selector: 'app-subcontractor-completion-table',
  templateUrl: './subcontractor-completion-table.component.html',
  styleUrls: ['./subcontractor-completion-table.component.css']
})
export class SubcontractorCompletionTableComponent implements OnInit {

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

  @Input()
  passedWorkOrderId: any;

  @Output()
  totalChangedEvent: EventEmitter<number> = new EventEmitter();

  @ViewChild(MatTable)
  entityTable!: MatTable<SubcontractorItem>;

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: SubcontractorItemService,
    private workOrderService: WorkOrderService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;

    this.displayedColumns = ['createdDate', 'entityName', 'workOrder', 'notes', 'qty', 'status', 'actions'];
    if((this.loggedInRole=='ROLE_ADMIN')||(this.loggedInRole=='ROLE_SUPER_ADMIN')) {
      this.displayedColumns = ['createdDate', 'entityName', 'workOrder', 'notes', 'unitPrice', 'qty', 'totalPrice', 'status', 'actions'];
    }
  }

  ngOnInit() {
    this.setupComponent().finally(() => console.log("Finished setting up component\n"));
  }

  async setupComponent() {
    // get an array of the IDs, of the work orders to show...
    await this.getWorkOrdersToShow();
    // get the table data, but only from the IDs in workOrdersToShow..
    await this.buildTable();
    // sum the items' totals...
    await this.data.forEach((item: { totalPrice: number; }) => this.componentTotal += item.totalPrice);
    this.totalChangedEvent.emit(this.componentTotal);
    this.sort.active = 'createdDate';
    this.sort.direction = 'desc';
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
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
        items.filter(item => ((item.status == "ACTIVE") && (this.workOrdersToShow.includes(item.workOrder.id))))))
      .toPromise()
      .then(data => { this.data = data })
      .finally(() => { this.dataSource = new MatTableDataSource(this.data) });
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

  openAddDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    addDialogConfig.width = "40%";
    addDialogConfig.position = { top:  '0' };
    addDialogConfig.data = { woId: this.passedWorkOrderId };
    const addDialogRef = this.dialog.open(SubcontractorItemAddComponent, addDialogConfig);
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
    editDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const editDialogRef = this.dialog.open(SubcontractorItemEditComponent, editDialogConfig);
    editDialogRef.afterClosed().subscribe(editData => {
      this.buildTable();
    });
  }

  openCompleteDialog( _id: number) {
    const completeDialogConfig = new MatDialogConfig();
    completeDialogConfig.disableClose = true;
    completeDialogConfig.autoFocus = true;
    completeDialogConfig.width = "40%";
    completeDialogConfig.position = { top:  '0' };
    completeDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const completeDialogRef = this.dialog.open(SubcontractorItemCompleteComponent, completeDialogConfig);
    completeDialogRef.afterClosed().subscribe(editData => {
      this.buildTable();
    });
  }

  openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.width = "25%";
    deleteDialogConfig.position = { top:  '0' };
    deleteDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const deleteDialogRef = this.dialog.open(SubcontractorItemDeleteComponent, deleteDialogConfig);
    deleteDialogRef.afterClosed().subscribe(deleteData => {
      this.buildTable();
    });
  }

}
