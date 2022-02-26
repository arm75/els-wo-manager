import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { WorkOrderService } from "../../../core/services/work-order.service";
import { WorkOrder } from "../../../core/models/work-order";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { WorkOrderAddComponent } from "../../dialogs/work-order-add/work-order-add.component";
import { WorkOrderEditComponent } from "../../dialogs/work-order-edit/work-order-edit.component";
import { WorkOrderDeleteComponent } from "../../dialogs/work-order-delete/work-order-delete.component";
import {MatSelect} from "@angular/material/select";
import {CustomerService} from "../../../core/services/customer.service";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-work-order-table',
  templateUrl: './work-order-table.component.html',
  styleUrls: ['./work-order-table.component.css']
})
export class WorkOrderTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'quickDescription', 'customer', 'location', 'createdDate', 'updatedDate', 'status', 'actions'];

  dataSource: any;

  @ViewChild(MatTable)
  entityTable!: MatTable<WorkOrder>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  /////////////////////////////////////////////////////////////////////////////////////

  @ViewChild('customerSelect')
  customerSelect!: MatSelect;

  selected!: string;

  loadedCustomers: any;

  //////////////////////////////////////////////////////////////////////////////////////

  constructor(
    private entityService: WorkOrderService,
    private customerService: CustomerService, ///////////////////////////////
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    this.buildTable();

    /////////////////////////////////////////////////////////////////
    this.customerService.getAll().subscribe(
      data => {
        console.log(data);
        this.loadedCustomers = data;
      },
      error => {
        console.log(error);
      }
    );
    /////////////////////////////////////////////////////////////////

  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.buildTable();
  }

 buildTable() {
    this.entityService.getAll()
      .pipe(map(items =>
        items.filter(item => (item.status == 'OPEN'))))
      .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  selectChange() {
    console.log(this.selected)
    alert("You selected" + this.selected);
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
