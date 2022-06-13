import {Component, OnInit, AfterViewInit, ViewChild, Input, OnChanges} from '@angular/core';
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { InventoryService } from "../../../core/services/inventory.service";
import { Inventory } from "../../../core/models/inventory";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { InventoryAddComponent } from "../../dialogs/inventory-add/inventory-add.component";
import { InventoryEditComponent } from "../../dialogs/inventory-edit/inventory-edit.component";
import { InventoryDeleteComponent } from "../../dialogs/inventory-delete/inventory-delete.component";
import {map} from "rxjs/operators";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {InventoryGroupService} from "../../../core/services/inventory-group.service";
import {WorkOrderStatus} from "../../../core/types/work-order-status";
import {interval, Subscription} from "rxjs";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit {

  loggedInUser: any;
  loggedInUsername: any;
  loggedInRole: any;
  nameToDisplay: any;

  displayedColumns: any;
  dataSource: any;
  data: any;
  filter: any;

  refreshTimer!: Subscription;

  inventoryGroupFilterSelected: any;
  inventoryGroupFilterArray: any;

  @Input()
  filterGroupId: number = 0;

  @ViewChild(MatTable)
  entityTable!: MatTable<Inventory>;

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: InventoryService,
    private inventoryGroupService: InventoryGroupService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;

    this.displayedColumns = ['id', 'entityName', 'inventoryGroup', 'totalInStock', 'unitCost', 'unitPrice', 'actions'];
    this.inventoryGroupFilterSelected = 'ALL';
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
    await this.loadInventoryGroupSelect();
  }

  async subscribeToRefreshEmitter(log?: boolean, tabName?: string) {
    //await this.refreshTable();
    this.refreshTimer = interval(environment.refreshInterval).subscribe(async (data: number)=>{
      if (log) { console.log(tabName, "refresh event:", data); }
      await this.refreshTable();
    });
  }

  async unsubscribeFromRefreshEmitter(log?: boolean, tabName?: string) {
    if (log) { console.log("Unsubscribe from", tabName, "refresh."); }
    if(this.refreshTimer) {
      this.refreshTimer.unsubscribe();
    }
  }

  async buildTable() {
    switch(this.inventoryGroupFilterSelected) {
      case 'ALL': {
        await this.entityService.getAll()
          .toPromise()
          .then(data => { this.data = data })
          .finally( () => { this.dataSource = new MatTableDataSource(this.data) });
        break;
      }
      default: {
        await this.entityService.getAll().pipe(map(items =>
          items.filter(item => (item.inventoryGroup.id == this.inventoryGroupFilterSelected))))
          .toPromise()
          .then(data => { this.data = data })
          .finally( () => { this.dataSource = new MatTableDataSource(this.data) });
        break;
      }
    }
  }

  async configTable() {
    this.sort.active = 'entityName';
    this.sort.direction = 'asc';
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  async refreshTable() {
    this.sort = this.dataSource.sort;
    //this.paginator = this.dataSource.paginator;
    // get the table..
    await this.buildTable();
    // configure table
    await this.refreshConfigTable();
  }

  async refreshConfigTable() {
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  async loadInventoryGroupSelect() {
    await this.inventoryGroupService.getAll().toPromise()
      .then(data => { this.data = data })
      .finally(() => { this.inventoryGroupFilterArray = this.data });
  }


  selectChange() {
    this.setupComponent().finally(() => {});
  }

  applyFilter(event: Event) {
    const filterTarget = (event.target as HTMLInputElement).value;
    if (filterTarget) { this.dataSource.filter = filterTarget.trim().toLowerCase(); }
  }

  clearFilter() {
    this.dataSource.filter = '';
    this.filter = '';
    this.inventoryGroupFilterSelected = 'ALL';
    this.selectChange();
  }

  async openAddDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    addDialogConfig.width = "40%";
    addDialogConfig.position = { top:  '0' };
    const addDialogRef = this.dialog.open(InventoryAddComponent, addDialogConfig);
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
    const editDialogRef = this.dialog.open(InventoryEditComponent, editDialogConfig);
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
    const deleteDialogRef = this.dialog.open(InventoryDeleteComponent, deleteDialogConfig);
    await deleteDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

}
