import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { LocationService } from "../../../core/services/location.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LocationAddComponent } from "../../dialogs/location-add/location-add.component";
import { LocationEditComponent } from "../../dialogs/location-edit/location-edit.component";
import { LocationDeleteComponent } from "../../dialogs/location-delete/location-delete.component";
import { Location } from "../../../core/models/location";

@Component({
  selector: 'app-locations-table',
  templateUrl: './locations-table.component.html',
  styleUrls: ['./locations-table.component.css']
})
export class LocationsTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'locationName', 'phoneNumb', 'emailAddr', 'actions'];

  dataSource: any;

  @ViewChild(MatTable)
  customerTable!: MatTable<Location>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private locationService: LocationService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    this.locationService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.locationService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyLocationFilter(event: Event) {
    const filterTarget = (event.target as HTMLInputElement).value;
    if (filterTarget) { this.dataSource.filter = filterTarget.trim().toLowerCase() }
  }

  // opens Dialog box
  openAddDialog() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.disableClose = true;
    addDialogConfig.autoFocus = true;
    // this.dialog.open(CustomerAddComponent, dialogConfig);
    const addDialogRef = this.dialog.open(LocationAddComponent, addDialogConfig);
    addDialogRef.afterClosed().subscribe(addData => {
      this.locationService.getAll().subscribe(afterAddData => {
          this.dataSource = new MatTableDataSource(afterAddData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }


      );
    })
  }

  // opens Dialog box
  openEditDialog( _id: number) {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.data = { locationId: _id };
    // this.dialog.open(CustomerEditComponent, dialogConfig)
    const editDialogRef = this.dialog.open(LocationEditComponent, editDialogConfig);
    editDialogRef.afterClosed().subscribe(editData => {
      this.locationService.getAll().subscribe(afterEditData => {
        this.dataSource = new MatTableDataSource(afterEditData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, editData);
    });
  }

  // opens Dialog box
  openDeleteDialog( _id: number) {
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.data = { locationId: _id };
    // this.dialog.open(CustomerDeleteComponent, dialogConfig)
    const deleteDialogRef = this.dialog.open(LocationDeleteComponent, deleteDialogConfig);
    deleteDialogRef.afterClosed().subscribe(
      deleteData => {
        this.locationService.getAll().subscribe(afterDeleteData => {
          this.dataSource = new MatTableDataSource(afterDeleteData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, deleteData);
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
