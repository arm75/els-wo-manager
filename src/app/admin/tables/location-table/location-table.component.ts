import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { LocationService } from "../../../core/services/location.service";
import { Location } from "../../../core/models/location";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LocationAddComponent } from "../../dialogs/location-add/location-add.component";
import { LocationEditComponent } from "../../dialogs/location-edit/location-edit.component";
import { LocationDeleteComponent } from "../../dialogs/location-delete/location-delete.component";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {map} from "rxjs/operators";
import {WorkOrderStatus} from "../../../core/types/work-order-status";
import {CustomerService} from "../../../core/services/customer.service";

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.css']
})
export class LocationTableComponent implements OnInit {

  loggedInUser: any;
  loggedInUsername: any;
  loggedInRole: any;
  nameToDisplay: any;

  displayedColumns: any;
  dataSource: any;
  data: any;
  filter: any;

  customerFilterSelected: any;
  customerFilterArray: any;

  @ViewChild(MatTable)
  entityTable!: MatTable<Location>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: LocationService,
    private customerService: CustomerService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;

    this.displayedColumns = ['id', 'entityName', 'customer', 'actions'];
    this.customerFilterSelected = 'ALL';
  }

  ngOnInit() {
    this.setupComponent().finally(() => {});
  }

  async setupComponent() {
    // get the table..
    await this.buildTable();
    // configure table
    await this.configTable();
    // load group filter select
    await this.loadCustomerSelect();
  }

  async buildTable() {
    switch(this.customerFilterSelected) {
      case 'ALL': {
        await this.entityService.getAll()
          .toPromise()
          .then(data => { this.data = data })
          .finally( () => { this.dataSource = new MatTableDataSource(this.data) });
        break;
      }
      default: {
        await this.entityService.getAll().pipe(map(items =>
          items.filter(item => ((item.customer.id == this.customerFilterSelected)))))
          .toPromise()
          .then(data => { this.data = data })
          .finally( () => { this.dataSource = new MatTableDataSource(this.data) });
        break;
      }
    }
  }

  // async buildTable1() {
  //   await this.entityService.getAll()
  //     .toPromise()
  //     .then(data => { this.data = data })
  //     .finally( () => { this.dataSource = new MatTableDataSource(this.data); });
  // }

  async configTable() {
    this.sort.active = 'id';
    this.sort.direction = 'desc';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async loadCustomerSelect() {
    await this.customerService.getAll().toPromise()
      .then(data => { this.data = data })
      .finally(() => { this.customerFilterArray = this.data });
  }

  selectChange() {
    this.setupComponent().finally(() => {});
  }

  applyFilter(event: Event) {
    const filterTarget = (event.target as HTMLInputElement).value;
    if (filterTarget == '') { this.clearFilter(); }
    if (filterTarget) { this.dataSource.filter = filterTarget.trim().toLowerCase(); }
  }

  clearFilter() {
    this.dataSource.filter = '';
    this.filter = '';
    this.customerFilterSelected = 'ALL';
    this.selectChange();
  }

  async openAddDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    addDialogConfig.width = "40%";
    addDialogConfig.position = { top:  '0' };
    const addDialogRef = this.dialog.open(LocationAddComponent, addDialogConfig);
    await addDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openEditDialog( _id: number) {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.width = "40%";
    editDialogConfig.position = { top:  '0' };
    editDialogConfig.data = { entityId: _id };
    const editDialogRef = this.dialog.open(LocationEditComponent, editDialogConfig);
    await editDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.width = "25%";
    deleteDialogConfig.position = { top:  '0' };
    deleteDialogConfig.data = { entityId: _id };
    const deleteDialogRef = this.dialog.open(LocationDeleteComponent, deleteDialogConfig);
    await deleteDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

}
