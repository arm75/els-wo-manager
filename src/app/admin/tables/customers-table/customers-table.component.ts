import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTable, MatTableDataSource} from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { CustomerService } from "../../../core/services/customer.service";
import { Customer } from "../../../core/models/customer";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { CustomerAddComponent } from "../../dialogs/customer-add/customer-add.component";
import { CustomerEditComponent } from "../../dialogs/customer-edit/customer-edit.component";
import { CustomerDeleteComponent } from "../../dialogs/customer-delete/customer-delete.component";
import {InventoryGroup} from "../../../core/models/inventory-group";

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.css']
})
export class CustomersTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'customerName', 'phoneNumb', 'emailAddr', 'actions'];

  dataSource: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private customerService: CustomerService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    this.customerService.getCustomers().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      // this.dataSource = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.customerService.getCustomers()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        //this.dataSource = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; });
  }

  applyCustomerFilter(event: Event) {
    const filterTarget = event.target as HTMLButtonElement;
    if (filterTarget) { this.dataSource.filter = filterTarget.value.trim().toLowerCase() }
  }

  // opens Dialog box
  openAddDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    // this.dialog.open(CustomerAddComponent, dialogConfig);
    const addDialogRef = this.dialog.open(CustomerAddComponent, addDialogConfig);
    addDialogRef.afterClosed().subscribe(
      addData => {
        this.customerService.getCustomers()
          .subscribe(afterAddData => {
            this.dataSource = new MatTableDataSource(afterAddData);
            //this.dataSource = data;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, addData);
      });
  }

  // opens Dialog box
  openEditDialog( _id: number) {
    console.log("UserId passed from click: " + _id);
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.data = { customerId: _id };
    // this.dialog.open(CustomerEditComponent, dialogConfig)
    const editDialogRef = this.dialog.open(CustomerEditComponent, editDialogConfig);
    editDialogRef.afterClosed().subscribe(
      editData => {
        this.customerService.getCustomers()
          .subscribe(afterEditData => {
            this.dataSource = new MatTableDataSource(afterEditData);
            //this.dataSource = data;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, editData);
      });
  }

  // opens Dialog box
  openDeleteDialog( _id: number) {
    console.log("UserId passed from click: " + _id);
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.data = { customerId: _id };
    // this.dialog.open(CustomerDeleteComponent, dialogConfig)
    const deleteDialogRef = this.dialog.open(CustomerDeleteComponent, deleteDialogConfig);
    deleteDialogRef.afterClosed().subscribe(
      deleteData => {
        this.customerService.getCustomers()
          .subscribe(afterDeleteData => {
            this.dataSource = new MatTableDataSource(afterDeleteData);
            //this.dataSource = data;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, deleteData);
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
