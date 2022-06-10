import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { SubcontractorGroupService } from "../../../core/services/subcontractor-group.service";
import { SubcontractorGroup } from "../../../core/models/subcontractor-group";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SubcontractorGroupAddComponent } from "../../dialogs/subcontractor-group-add/subcontractor-group-add.component";
import { SubcontractorGroupEditComponent } from "../../dialogs/subcontractor-group-edit/subcontractor-group-edit.component";
import { SubcontractorGroupDeleteComponent } from "../../dialogs/subcontractor-group-delete/subcontractor-group-delete.component";
import {interval, Subscription} from "rxjs";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-subcontractor-group-table',
  templateUrl: './subcontractor-group-table.component.html',
  styleUrls: ['./subcontractor-group-table.component.css']
})
export class SubcontractorGroupTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'entityName', 'description', 'actions'];

  dataSource: any;
  data: any;
  filter: any;

  refreshTimer!: Subscription;

  @ViewChild(MatTable)
  entityTable!: MatTable<SubcontractorGroup>;

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: SubcontractorGroupService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    this.buildTable();
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

  async subscribeToRefreshEmitter(log?: boolean, tabName?: string) {
    await this.refreshTable();
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
    await this.entityService.getAll()
      .toPromise()
      .then(data => { this.data = data })
      .finally( () => { this.dataSource = new MatTableDataSource(this.data); });
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

  applyFilter(event: Event) {
    const filterTarget = (event.target as HTMLInputElement).value;
    if (filterTarget == '') { this.clearFilter(); }
    if (filterTarget) { this.dataSource.filter = filterTarget.trim().toLowerCase(); }
  }

  clearFilter() {
    this.dataSource.filter = '';
    this.filter = '';
  }

  async openAddDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    addDialogConfig.width = "40%";
    addDialogConfig.position = { top:  '0' };
    const addDialogRef = this.dialog.open(SubcontractorGroupAddComponent, addDialogConfig);
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
    const editDialogRef = this.dialog.open(SubcontractorGroupEditComponent, editDialogConfig);
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
    const deleteDialogRef = this.dialog.open(SubcontractorGroupDeleteComponent, deleteDialogConfig);
    await deleteDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

}
