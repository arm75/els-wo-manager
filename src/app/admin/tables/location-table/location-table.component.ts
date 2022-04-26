import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  AfterViewChecked,
  OnChanges,
  DoCheck,
  AfterContentInit, AfterContentChecked, OnDestroy
} from '@angular/core';
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { LocationService } from "../../../core/services/location.service";
import { Location } from "../../../core/models/location";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LocationAddComponent } from "../../dialogs/location-add/location-add.component";
import { LocationEditComponent } from "../../dialogs/location-edit/location-edit.component";
import { LocationDeleteComponent } from "../../dialogs/location-delete/location-delete.component";

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.css']
})
export class LocationTableComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
//export class LocationTableComponent implements OnChanges, OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'entityName', 'customer', 'actions'];

  dataSource: any;

  logNg: boolean = false;

  @ViewChild(MatTable)
  entityTable!: MatTable<Location>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: LocationService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    if (this.logNg) { console.log("Constructor ran.\n") }
    this.buildTable();
  }

  ngOnChanges() {
    if (this.logNg) { console.log("ngOnChanges ran.\n") }
  }

  ngOnInit() {
    if (this.logNg) { console.log("ngOnInit ran.\n") }
  }

  ngDoCheck() {
    if (this.logNg) { console.log("ngDoCheck ran.\n") }
  }

  ngAfterContentInit() {
    if (this.logNg) { console.log("ngAfterContentInit ran.\n") }
  }

  ngAfterContentChecked() {
    if (this.logNg) { console.log("ngAfterContentChecked ran.\n") }
  }

  ngAfterViewInit() {
    if (this.logNg) { console.log("ngAfterViewInit ran.\n") }
    this.buildTable();
  }

  ngAfterViewChecked() {
    if (this.logNg) { console.log("ngAfterViewChecked ran.\n") }
  }

  ngOnDestroy() {
    if (this.logNg) { console.log("ngOnDestroy ran.\n") }
  }

  buildTable() {
    this.entityService.getAll().subscribe(data => {
      //console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.sort.active = 'id';
      this.sort.direction = 'desc';
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
    addDialogConfig.width = "40%";
    addDialogConfig.position = { top:  '0' };
    const addDialogRef = this.dialog.open(LocationAddComponent, addDialogConfig);
    addDialogRef.afterClosed().subscribe(addData => {
      this.buildTable();
    });
  }

  // opens Dialog box
  openEditDialog( _id: number) {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.width = "40%";
    editDialogConfig.position = { top:  '0' };
    editDialogConfig.data = { entityId: _id };
    const editDialogRef = this.dialog.open(LocationEditComponent, editDialogConfig);
    editDialogRef.afterClosed().subscribe(editData => {
      this.buildTable();
    });
  }

  // opens Dialog box
  openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.width = "25%";
    deleteDialogConfig.position = { top:  '0' };
    deleteDialogConfig.data = { entityId: _id };
    const deleteDialogRef = this.dialog.open(LocationDeleteComponent, deleteDialogConfig);
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

