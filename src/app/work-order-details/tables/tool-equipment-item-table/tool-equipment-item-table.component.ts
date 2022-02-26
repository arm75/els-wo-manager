import {Component, OnInit, AfterViewInit, ViewChild, Input} from '@angular/core';
import { LiveAnnouncer } from "@angular/cdk/a11y";
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

@Component({
  selector: 'app-tool-equipment-item-table',
  templateUrl: './tool-equipment-item-table.component.html',
  styleUrls: ['./tool-equipment-item-table.component.css']
})
export class ToolEquipmentItemTableComponent implements OnInit, AfterViewInit {

  @Input()
  passedWorkOrderId: any;

  displayedColumns: string[] = ['createdDate', 'updatedDate', 'actions'];
  dataSource: any;

  @ViewChild(MatTable)
  entityTable!: MatTable<ToolEquipmentItem>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: ToolEquipmentItemService,
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
    this.entityService.getAll()
      .pipe(map(items =>
        items.filter(item => (item.workOrderId == this.passedWorkOrderId))))
      .subscribe(data => {
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
    addDialogConfig.width = "40%";
    addDialogConfig.position = { top:  '0' };
    const addDialogRef = this.dialog.open(ToolEquipmentItemAddComponent, addDialogConfig);
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
    const editDialogRef = this.dialog.open(ToolEquipmentItemEditComponent, editDialogConfig);
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
    const deleteDialogRef = this.dialog.open(ToolEquipmentItemDeleteComponent, deleteDialogConfig);
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
