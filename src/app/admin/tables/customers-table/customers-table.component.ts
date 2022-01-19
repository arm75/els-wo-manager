import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { CustomerService } from "../../../core/services/customer.service";
import { Customer } from "../../../core/models/customer";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { CustomerAddComponent } from "../../dialogs/customer-add/customer-add.component";
import { CustomerEditComponent } from "../../dialogs/customer-edit/customer-edit.component";

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.css']
})
export class CustomersTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'customerName', 'phoneNumb', 'emailAddr', 'actions'];
  dataSource!: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(
    private customerService: CustomerService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    this.customerService.getCustomers().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.customerService.getCustomers().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  // opens Dialog box
  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CustomerAddComponent, dialogConfig);
    // const dialogRef = this.dialog.open(CustomerAddComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(
    //   data => console.log("Dialog output:", data)
    // );
  }

  // opens Dialog box
  openEditDialog( _id: number) {
    console.log("UserId passed from click: " + _id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { customerId: _id };
    this.dialog.open(CustomerEditComponent, dialogConfig);
    // const dialogRef = this.dialog.open(CustomerAddComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(
    //   data => console.log("Dialog output:", data)
    // );
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
