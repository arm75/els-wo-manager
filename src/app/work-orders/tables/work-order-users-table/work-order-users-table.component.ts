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

@Component({
  selector: 'app-work-order-users-table',
  templateUrl: './work-order-users-table.component.html',
  styleUrls: ['./work-order-users-table.component.css']
})
export class WorkOrderUsersTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['createdDate', 'id', 'quickDescription', 'customer', 'location',  'status', 'actions'];

  dataSource: any;

  dataSource2: any;

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
    private dialog: MatDialog
  ) {
    this.buildTable();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.buildTable();
  }

 home() {
    this.userService.get(1001340).subscribe((data) => {
      this.dataSource2 = data;
    }, error => {
    });
 }

 buildTable() {
   this.entityService.getAll()
     .pipe(map(items =>
       items.filter(item => ((item.status == WorkOrderStatus.OPEN)||(item.status == WorkOrderStatus.PENDING)))))
     .subscribe(data => {
       this.dataSource = new MatTableDataSource(data);
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

