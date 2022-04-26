import {Component, OnInit, ViewChild} from '@angular/core';
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
import {WorkOrderStatus} from "../../../core/types/work-order-status";
import {WorkOrderAddComponent} from "../../dialogs/work-order-add/work-order-add.component";
import {WorkOrderEditComponent} from "../../dialogs/work-order-edit/work-order-edit.component";
import {WorkOrderCompleteComponent} from "../../dialogs/work-order-complete/work-order-complete.component";
import {WorkOrderCloseComponent} from "../../dialogs/work-order-close/work-order-close.component";
import {WorkOrderCancelComponent} from "../../dialogs/work-order-cancel/work-order-cancel.component";
import {WorkOrderReopenComponent} from "../../dialogs/work-order-reopen/work-order-reopen.component";
import {WorkOrderRetryComponent} from "../../dialogs/work-order-retry/work-order-retry.component";
import {WorkOrderDeleteComponent} from "../../dialogs/work-order-delete/work-order-delete.component";

@Component({
  selector: 'app-work-order-history-table',
  templateUrl: './work-order-history-table.component.html',
  styleUrls: ['./work-order-history-table.component.css']
})
export class WorkOrderHistoryTableComponent implements OnInit {

  displayedColumns: string[] = ['createdDate', 'id', 'quickDescription', 'customer', 'location', 'status', 'workOrderTotal', 'actions'];

  dataSource: any;

  @ViewChild(MatTable)
  entityTable!: MatTable<WorkOrder>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  /////////////////////////////////////////////////////////////////////////////////////

  @ViewChild('workOrderFilterSelect')
  workOrderFilterSelect!: MatSelect;
  workOrderFilterSelected: string = 'ALL';
  loadedCustomers: any;

  //////////////////////////////////////////////////////////////////////////////////////
  dropdownFilterSelected: any;
  dropdownFilterArray = ElsWoManagerConstants.historyWorkOrderStatusFilterArray;

  constructor(
    private entityService: WorkOrderService,
    private customerService: CustomerService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
  ) {
    this.buildTable();

    /////////////////////////////////////////////////////////////////
    this.customerService.getAll().subscribe(
      data => {
        //console.log(data);
        this.loadedCustomers = data;
      },
      error => {
        //console.log(error);
      }
    );
    /////////////////////////////////////////////////////////////////
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.buildTable();
    // this.spinner.initiate();  |  does not work yet...
  }

  buildTable() {
    switch(this.workOrderFilterSelected) {
      case 'ALL': {
        this.entityService.getAll()
          .pipe(map(items =>
            items.filter(item => ( (item.status == WorkOrderStatus.PROCESSED) || (item.status == WorkOrderStatus.CANCELLED) ) ) ) )
          .subscribe(data => {
            //console.log(data);
            this.dataSource = new MatTableDataSource(data);
            this.sort.active = 'createdDate';
            this.sort.direction = 'desc';
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
        break;
      }
      default: {
        this.entityService.getAll()
          .pipe(map(items =>
            items.filter(item => ((item.status == this.workOrderFilterSelected)))))
          .subscribe(data => {
            //console.log(data);
            this.dataSource = new MatTableDataSource(data);
            this.sort.active = 'createdDate';
            this.sort.direction = 'desc';
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
        break;
      }
    }
  }

  selectChange() {
    this.buildTable();
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
    const addDialogRef = this.dialog.open(WorkOrderAddComponent, addDialogConfig);
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

  // opens Dialog box
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
