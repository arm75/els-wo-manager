import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { SubcontractorService } from "../../../core/services/subcontractor.service";
import { Subcontractor } from "../../../core/models/subcontractor";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SubcontractorAddComponent } from "../../dialogs/subcontractor-add/subcontractor-add.component";
import { SubcontractorEditComponent } from "../../dialogs/subcontractor-edit/subcontractor-edit.component";
import { SubcontractorDeleteComponent } from "../../dialogs/subcontractor-delete/subcontractor-delete.component";

@Component({
  selector: 'app-subcontractor-table',
  templateUrl: './subcontractor-table.component.html',
  styleUrls: ['./subcontractor-table.component.css']
})
export class SubcontractorTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'entityName', 'actions'];

  dataSource: any;

  @ViewChild(MatTable)
  entityTable!: MatTable<Subcontractor>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: SubcontractorService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    this.buildTable();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.buildTable(); 
  }

 buildTable() {
    this.entityService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
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
    const addDialogRef = this.dialog.open(SubcontractorAddComponent, addDialogConfig);
    addDialogRef.afterClosed().subscribe(addData => {
      this.buildTable();
    });
  }

  // opens Dialog box
  openEditDialog( _id: number) {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.data = { entityId: _id };
    const editDialogRef = this.dialog.open(SubcontractorEditComponent, editDialogConfig);
    editDialogRef.afterClosed().subscribe(editData => {
      this.buildTable();
    });
  }

  // opens Dialog box
  openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.data = { entityId: _id };
    const deleteDialogRef = this.dialog.open(SubcontractorDeleteComponent, deleteDialogConfig);
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

