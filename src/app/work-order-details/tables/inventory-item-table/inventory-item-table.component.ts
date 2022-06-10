import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { InventoryItemService } from "../../../core/services/inventory-item.service";
import { InventoryItem } from "../../../core/models/inventory-item";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { InventoryItemAddComponent } from "../../dialogs/inventory-item-add/inventory-item-add.component";
import { InventoryItemEditComponent } from "../../dialogs/inventory-item-edit/inventory-item-edit.component";
import { InventoryItemDeleteComponent } from "../../dialogs/inventory-item-delete/inventory-item-delete.component";
import { GlobalProgressSpinnerComponent} from "../../../shared/progress-spinner/global-progress-spinner/global-progress-spinner.component";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-inventory-item-table',
  templateUrl: './inventory-item-table.component.html',
  styleUrls: ['./inventory-item-table.component.css']
})
export class InventoryItemTableComponent implements OnInit {

  loggedInUser: any;
  loggedInUsername: any;
  loggedInRole: any;
  nameToDisplay: any;

  // componentTotal: any;
  displayedColumns: any;
  dataSource: any;
  data: any;
  filter: any;

  @Input()
  passedWorkOrderId: any;

  @Input()
  passedWorkOrderStatus: any;

  @Output()
  totalChangedEvent: EventEmitter<number> = new EventEmitter();

  @ViewChild(MatTable)
  entityTable!: MatTable<InventoryItem>;

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: InventoryItemService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;

    //this.componentTotal = 0;
    this.displayedColumns = ['createdDate', 'entityName', 'notes', 'qty', 'actions'];
    if((this.loggedInRole=='ROLE_ADMIN')||(this.loggedInRole=='ROLE_SUPER_ADMIN')) {
      this.displayedColumns = ['createdDate', 'entityName', 'notes', 'unitPrice', 'qty', 'totalPrice', 'actions'];
    }
  }

  ngOnInit() {
    this.setupComponent().finally(() => {});
  }

  async setupComponent() {
    // get the table..
    await this.buildTable();
    // configure table
    await this.configTable();
  }

  async buildTable() {
    await this.entityService.getAll().pipe(map(items =>
      items.filter(item => (item.workOrder.id == this.passedWorkOrderId))))
      .toPromise()
      .then(data => { this.data = data })
      .finally( () => {
        let componentTotal = 0;
        this.data.forEach((item: InventoryItem) => { componentTotal += item.totalPrice; });
        this.dataSource = new MatTableDataSource(this.data);
        this.totalChangedEvent.emit(componentTotal);
      });

  }

  async configTable() {
    this.sort.active = 'id';
    this.sort.direction = 'desc';
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  async openAddDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    addDialogConfig.width = "40%";
    addDialogConfig.position = {top: '0'};
    addDialogConfig.data = {woId: this.passedWorkOrderId};
    const addDialogRef = this.dialog.open(InventoryItemAddComponent, addDialogConfig);
    addDialogRef.afterClosed().subscribe(data => { if (data == true) { this.setupComponent(); }});
  }

  async openEditDialog( _id: number) {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.width = "40%";
    editDialogConfig.position = { top:  '0' };
    editDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const editDialogRef = this.dialog.open(InventoryItemEditComponent, editDialogConfig);
    editDialogRef.afterClosed().subscribe(data => { if (data == true) { this.setupComponent(); }});
  }

  async openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.width = "25%";
    deleteDialogConfig.position = { top:  '0' };
    deleteDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const deleteDialogRef = this.dialog.open(InventoryItemDeleteComponent, deleteDialogConfig);
    deleteDialogRef.afterClosed().subscribe(data => { if (data == true) { this.setupComponent(); }});
  }

}
