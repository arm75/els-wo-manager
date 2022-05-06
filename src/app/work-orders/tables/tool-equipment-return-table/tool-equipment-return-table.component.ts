import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ToolEquipmentItem} from "../../../core/models/tool-equipment-item";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {ToolEquipmentItemService} from "../../../core/services/tool-equipment-item.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {
  ToolEquipmentItemAddComponent
} from "../../../work-order-details/dialogs/tool-equipment-item-add/tool-equipment-item-add.component";
import {
  ToolEquipmentItemEditComponent
} from "../../../work-order-details/dialogs/tool-equipment-item-edit/tool-equipment-item-edit.component";
import {
  ToolEquipmentItemDeleteComponent
} from "../../../work-order-details/dialogs/tool-equipment-item-delete/tool-equipment-item-delete.component";
import {
  ToolEquipmentItemReturnComponent
} from "../../../work-order-details/dialogs/tool-equipment-item-return/tool-equipment-item-return.component";
import {map} from "rxjs/operators";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {WorkOrderService} from "../../../core/services/work-order.service";
import {WorkOrder} from "../../../core/models/work-order";
import {WorkOrderStatus} from "../../../core/types/work-order-status";
import {flatMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-tool-equipment-return-table',
  templateUrl: './tool-equipment-return-table.component.html',
  styleUrls: ['./tool-equipment-return-table.component.css']
})
export class ToolEquipmentReturnTableComponent implements OnInit {

  loggedInUser!: any;
  loggedInUsername!: string;
  loggedInRole!: string;
  nameToDisplay!: string;

  thisUsersWorkOrders!: any;

  @Input()
  passedWorkOrderId: any;

  @Output()
  totalChangedEvent: EventEmitter<number> = new EventEmitter();

  componentTotal: number = 0;

  displayedColumns: string[] = ['createdDate', 'entityName', 'workOrder', 'notes', 'days', 'status', 'actions'];
  dataSource: any;
  data: any;

  @ViewChild(MatTable)
  entityTable!: MatTable<ToolEquipmentItem>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: ToolEquipmentItemService,
    private workOrderService: WorkOrderService,
    private _liveAnnouncer: LiveAnnouncer,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;

    if((this.loggedInRole=='ROLE_ADMIN')||(this.loggedInRole=='ROLE_SUPER_ADMIN')) {
      this.displayedColumns = ['createdDate', 'entityName', 'workOrder', 'notes', 'pricePerDay', 'days', 'totalPrice', 'status', 'actions'];
    }

    //  this.buildTable();
  }

  ngOnInit() {
    this.start().finally(() => console.log("start finally"));
  }

  ngAfterViewInit() {
    //this.buildTable();
  }

  async start() {
    console.log("before the awaits");
    console.log("before getUsersWorkorders method:");
    await this.getUsersWorkOrders();
    console.log("after getUsersWorkorders method:", this.thisUsersWorkOrders);
    console.log("before buildTable method:");
    await this.buildTable();
    console.log("after buildTable method:", this.data);
    console.log("after the awaits");

    this.dataSource = new MatTableDataSource(this.data);
    this.sort.active = 'createdDate';
    this.sort.direction = 'desc';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async buildTable() {
    // this.getUsersWorkOrders();
    //console.log("thisUsersWorkOrders before: ", this.thisUsersWorkOrders);
    // this.thisUsersWorkOrders = this.thisUsersWorkOrders.map((data: WorkOrder) => data.id);
    console.log("before getAll()\n");
    //this.componentTotal = 0;
    await this.entityService.getAll()
      .pipe(map(items =>
        items.filter(item => ((item.status == "OUT") && (this.thisUsersWorkOrders.includes(item.workOrder.id))))))
      .toPromise()
      .then(data => {
        this.data = data;
        this.data.forEach((a: { totalPrice: number; }) => this.componentTotal += a.totalPrice);
        this.totalChangedEvent.emit(this.componentTotal);

      })
      .finally( () => {
        console.log("Finally on promise");
      });

      // .pipe(map(items =>
      //   items.filter(item => ((item.status == "OUT") && (this.thisUsersWorkOrders.includes(item.workOrder.id))))))
      // .subscribe(
      //   data => {
      //     data.forEach(a => this.componentTotal += a.totalPrice);
      //     this.totalChangedEvent.emit(this.componentTotal);
      //     this.dataSource = new MatTableDataSource(data);
      //     this.sort.active = 'createdDate';
      //     this.sort.direction = 'desc';
      //     this.dataSource.sort = this.sort;
      //     this.dataSource.paginator = this.paginator;
      //   },
      //   error => { },
      //   async () => { await this.testCompleteMethod() }
      //   ).toPromise
    console.log("RIGHT AFTER getAll, outside");
  }

  testCompleteMethod() {
    console.log("complete method:");
  }


  async getUsersWorkOrders() {
    // get the user's work orders
    await this.workOrderService.getAll()
      .pipe(map(items =>
        items.filter(item => ((
            (item.status == WorkOrderStatus.OPEN) ||
            (item.status == WorkOrderStatus.PENDING)) &&
          (item.assignedUsers.map((thisUser) => thisUser.username)).includes(this.loggedInUsername) ))
      ))
      .toPromise()
      .then(data => {
        this.thisUsersWorkOrders = data; });
      // .subscribe(
      //   data => { this.thisUsersWorkOrders = data; },
      //   error => { },
      //   () => { console.log("complete method:", this.thisUsersWorkOrders); });
  }

  applyFilter(event: Event) {
    const filterTarget = (event.target as HTMLInputElement).value;
    if (filterTarget) { this.dataSource.filter = filterTarget.trim().toLowerCase() }
  }

  // opens Dialog box
  openAddDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    addDialogConfig.width = "40%";
    addDialogConfig.position = { top:  '0' };
    addDialogConfig.data = { woId: this.passedWorkOrderId };
    const addDialogRef = this.dialog.open(ToolEquipmentItemAddComponent, addDialogConfig);
    addDialogRef.afterClosed().subscribe(addData => {
      this.buildTable();
    });
  }

  // opens Dialog box
  openEditDialog( _id: number) {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.width = "40%";
    editDialogConfig.position = { top:  '0' };
    editDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const editDialogRef = this.dialog.open(ToolEquipmentItemEditComponent, editDialogConfig);
    editDialogRef.afterClosed().subscribe(editData => {
      this.buildTable();
    });
  }

  openReturnItemDialog(_id: number) {
    const returnDialogConfig = new MatDialogConfig();
    returnDialogConfig.disableClose = true;
    returnDialogConfig.autoFocus = true;
    returnDialogConfig.width = "25%";
    returnDialogConfig.position = { top:  '0' };
    returnDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const returnDialogRef = this.dialog.open(ToolEquipmentItemReturnComponent, returnDialogConfig);
    returnDialogRef.afterClosed().subscribe(returnData => {
      this.buildTable();
    });
  }

  // opens Dialog box
  openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.width = "25%";
    deleteDialogConfig.position = { top:  '0' };
    deleteDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const deleteDialogRef = this.dialog.open(ToolEquipmentItemDeleteComponent, deleteDialogConfig);
    deleteDialogRef.afterClosed().subscribe(deleteData => {
      this.buildTable();
    });
  }

  /** Announce the change in sort state for assistive technology. */
  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  //  }


}
