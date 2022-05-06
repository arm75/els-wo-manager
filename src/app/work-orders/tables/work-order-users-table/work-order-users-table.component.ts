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

@Component({
  selector: 'app-work-order-users-table',
  templateUrl: './work-order-users-table.component.html',
  styleUrls: ['./work-order-users-table.component.css']
})
export class WorkOrderUsersTableComponent implements OnInit, AfterViewInit {

  loggedInUser!: any;
  loggedInUsername!: string;
  loggedInRole!: string;
  nameToDisplay!: string;

  displayedColumns: string[] = ['createdDate', 'id', 'quickDescription', 'customer', 'location',  'status', 'actions'];

  dataSource: any;

  // dataSource2: any;

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

    this.buildTable();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.buildTable();
  }

 // home() {
 //    this.userService.get(1001340).subscribe((data) => {
 //      this.dataSource2 = data;
 //    }, error => {
 //    });
 // }

 buildTable() {
   this.entityService.getAll()
     .pipe(map(items =>
       items.filter(item => ((
         (item.status == WorkOrderStatus.OPEN) ||
         (item.status == WorkOrderStatus.PENDING)) &&
         (item.assignedUsers.map((thisUser) => thisUser.username)).includes(this.loggedInUsername) ))
       ))
     .subscribe(data => {
       this.dataSource = new MatTableDataSource(data);
       this.sort.active = 'createdDate';
       this.sort.direction = 'desc';
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
     });
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
    const addDialogRef = this.dialog.open(WorkOrderUsersAddComponent, addDialogConfig);
    addDialogRef.afterClosed().subscribe(addData => {
      this.buildTable();
    });
  }

  // opens Dialog box
  openEditDialog( _id: number) {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.data = { entityId: _id };
    const editDialogRef = this.dialog.open(WorkOrderUsersEditComponent, editDialogConfig);
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

  // opens Dialog box
  openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.data = { entityId: _id };
    const deleteDialogRef = this.dialog.open(WorkOrderUsersDeleteComponent, deleteDialogConfig);
    deleteDialogRef.afterClosed().subscribe(deleteData => {
      this.buildTable();
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

