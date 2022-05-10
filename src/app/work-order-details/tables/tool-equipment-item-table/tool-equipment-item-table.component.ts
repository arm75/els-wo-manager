import {Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { ToolEquipmentItemService } from "../../../core/services/tool-equipment-item.service";
import { ToolEquipmentItem } from "../../../core/models/tool-equipment-item";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ToolEquipmentItemAddComponent } from "../../dialogs/tool-equipment-item-add/tool-equipment-item-add.component";
import { ToolEquipmentItemEditComponent } from "../../dialogs/tool-equipment-item-edit/tool-equipment-item-edit.component";
import { ToolEquipmentItemDeleteComponent } from "../../dialogs/tool-equipment-item-delete/tool-equipment-item-delete.component";
import {map} from "rxjs/operators";
import {ToolEquipmentItemReturnComponent} from "../../dialogs/tool-equipment-item-return/tool-equipment-item-return.component";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {InventoryItem} from "../../../core/models/inventory-item";

@Component({
  selector: 'app-tool-equipment-item-table',
  templateUrl: './tool-equipment-item-table.component.html',
  styleUrls: ['./tool-equipment-item-table.component.css']
})
export class ToolEquipmentItemTableComponent implements OnInit {

  loggedInUser: any;
  loggedInUsername: any;
  loggedInRole: any;
  nameToDisplay: any;

  componentTotal: any;
  displayedColumns: any;
  dataSource: any;
  data: any;

  @Input()
  passedWorkOrderId: any;

  @Output()
  totalChangedEvent: EventEmitter<number> = new EventEmitter();

  @ViewChild(MatTable)
  entityTable!: MatTable<ToolEquipmentItem>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: ToolEquipmentItemService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;

    this.componentTotal = 0;
    this.displayedColumns = ['createdDate', 'entityName', 'notes', 'days', 'status', 'actions'];
    if(this.loggedInRole=='ROLE_ADMIN'||this.loggedInRole=='ROLE_SUPER_ADMIN') {
      this.displayedColumns = ['createdDate', 'entityName', 'notes', 'pricePerDay', 'days', 'totalPrice', 'status', 'actions'];
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
        this.data.forEach((item: ToolEquipmentItem) => this.componentTotal += item.totalPrice);
        this.dataSource = new MatTableDataSource(this.data);
        this.totalChangedEvent.emit(this.componentTotal);
      });
  }

  async configTable() {
    this.sort.active = 'id';
    this.sort.direction = 'desc';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async openAddDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    addDialogConfig.width = "40%";
    addDialogConfig.position = { top:  '0' };
    addDialogConfig.data = { woId: this.passedWorkOrderId };
    const addDialogRef = this.dialog.open(ToolEquipmentItemAddComponent, addDialogConfig);
    await addDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openEditDialog( _id: number) {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.width = "40%";
    editDialogConfig.position = { top:  '0' };
    editDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const editDialogRef = this.dialog.open(ToolEquipmentItemEditComponent, editDialogConfig);
    await editDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openReturnDialog(_id: number) {
    const returnDialogConfig = new MatDialogConfig();
    returnDialogConfig.disableClose = true;
    returnDialogConfig.autoFocus = true;
    returnDialogConfig.width = "25%";
    returnDialogConfig.position = { top:  '0' };
    returnDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const returnDialogRef = this.dialog.open(ToolEquipmentItemReturnComponent, returnDialogConfig);
    await returnDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.width = "25%";
    deleteDialogConfig.position = { top:  '0' };
    deleteDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const deleteDialogRef = this.dialog.open(ToolEquipmentItemDeleteComponent, deleteDialogConfig);
    await deleteDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

}
