import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { LaborItemService } from "../../../core/services/labor-item.service";
import { LaborItem } from "../../../core/models/labor-item";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LaborItemAddComponent } from "../../dialogs/labor-item-add/labor-item-add.component";
import { LaborItemEditComponent } from "../../dialogs/labor-item-edit/labor-item-edit.component";
import { LaborItemDeleteComponent } from "../../dialogs/labor-item-delete/labor-item-delete.component";
import {map} from "rxjs/operators";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {InventoryItem} from "../../../core/models/inventory-item";

@Component({
  selector: 'app-labor-item-table',
  templateUrl: './labor-item-table.component.html',
  styleUrls: ['./labor-item-table.component.css']
})
export class LaborItemTableComponent implements OnInit {

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

  @Input()
  passedWorkOrderStatus: any;

  @Output()
  totalChangedEvent: EventEmitter<number> = new EventEmitter();

  @ViewChild(MatTable)
  entityTable!: MatTable<LaborItem>;

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: LaborItemService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;

    this.componentTotal = 0;
    this.displayedColumns = ['createdDate', 'entityName', 'notes', 'totalTime', 'actions'];
    if((this.loggedInRole=='ROLE_ADMIN')||(this.loggedInRole=='ROLE_SUPER_ADMIN')) {
      this.displayedColumns = ['createdDate', 'entityName', 'notes', 'ratePerHour', 'totalTime', 'totalPrice', 'actions'];
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
        this.data.forEach((item: LaborItem) => this.componentTotal += item.totalPrice);
        this.dataSource = new MatTableDataSource(this.data);
        this.totalChangedEvent.emit(this.componentTotal);
      });
  }

  async configTable() {
    this.sort.active = 'id';
    this.sort.direction = 'desc';
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterTarget = (event.target as HTMLInputElement).value;
    if (filterTarget) { this.dataSource.filter = filterTarget.trim().toLowerCase(); }
  }

  async openAddDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    addDialogConfig.width = "40%";
    addDialogConfig.position = { top:  '0' };
    addDialogConfig.data = { woId: this.passedWorkOrderId };
    const addDialogRef = this.dialog.open(LaborItemAddComponent, addDialogConfig);
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
    const editDialogRef = this.dialog.open(LaborItemEditComponent, editDialogConfig);
    await editDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

  async openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.width = "25%";
    deleteDialogConfig.position = { top:  '0' };
    deleteDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const deleteDialogRef = this.dialog.open(LaborItemDeleteComponent, deleteDialogConfig);
    await deleteDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

}
