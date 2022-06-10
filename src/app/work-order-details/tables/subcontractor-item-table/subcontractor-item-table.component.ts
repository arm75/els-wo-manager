import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { SubcontractorItemService } from "../../../core/services/subcontractor-item.service";
import { SubcontractorItem } from "../../../core/models/subcontractor-item";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SubcontractorItemAddComponent } from "../../dialogs/subcontractor-item-add/subcontractor-item-add.component";
import { SubcontractorItemEditComponent } from "../../dialogs/subcontractor-item-edit/subcontractor-item-edit.component";
import { SubcontractorItemDeleteComponent } from "../../dialogs/subcontractor-item-delete/subcontractor-item-delete.component";
import { SubcontractorItemCompleteComponent } from "../../dialogs/subcontractor-item-complete/subcontractor-item-complete.component";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {map} from "rxjs/operators";
import {InventoryItem} from "../../../core/models/inventory-item";

@Component({
  selector: 'app-subcontractor-item-table',
  templateUrl: './subcontractor-item-table.component.html',
  styleUrls: ['./subcontractor-item-table.component.css']
})
export class SubcontractorItemTableComponent implements OnInit {

  loggedInUser: any;
  loggedInUsername: any;
  loggedInRole: any;
  nameToDisplay: any;

  // componentTotal: any;
  displayedColumns: any;
  dataSource: any;
  data: any;

  @Input()
  passedWorkOrderId: any;

  @Input()
  passedWorkOrderStatus: any;

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
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;

    //this.componentTotal = 0;
    this.displayedColumns = ['createdDate', 'entityName', 'notes', 'status', 'actions'];
    if(this.loggedInRole=='ROLE_ADMIN'||this.loggedInRole=='ROLE_SUPER_ADMIN') {
      this.displayedColumns = ['createdDate', 'entityName', 'notes', 'total', 'status', 'actions'];
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
        this.data.forEach((item: SubcontractorItem) => { componentTotal += item.total; });
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
    addDialogConfig.position = { top:  '0' };
    addDialogConfig.data = { woId: this.passedWorkOrderId };
    const addDialogRef = this.dialog.open(SubcontractorItemAddComponent, addDialogConfig);
    addDialogRef.afterClosed().subscribe(data => { if (data == true) { this.setupComponent(); }});
  }

  async openEditDialog( _id: number) {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.width = "40%";
    editDialogConfig.position = { top:  '0' };
    editDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const editDialogRef = this.dialog.open(SubcontractorItemEditComponent, editDialogConfig);
    editDialogRef.afterClosed().subscribe(data => { if (data == true) { this.setupComponent(); }});
  }

  async openCompleteDialog( _id: number) {
    const completeDialogConfig = new MatDialogConfig();
    completeDialogConfig.disableClose = true;
    completeDialogConfig.autoFocus = true;
    completeDialogConfig.width = "40%";
    completeDialogConfig.position = { top:  '0' };
    completeDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const completeDialogRef = this.dialog.open(SubcontractorItemCompleteComponent, completeDialogConfig);
    completeDialogRef.afterClosed().subscribe(data => { if (data == true) { this.setupComponent(); }});
  }

  async openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.width = "25%";
    deleteDialogConfig.position = { top:  '0' };
    deleteDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const deleteDialogRef = this.dialog.open(SubcontractorItemDeleteComponent, deleteDialogConfig);
    deleteDialogRef.afterClosed().subscribe(data => { if (data == true) { this.setupComponent(); }});
  }

}
