import {Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
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
import {map} from "rxjs/operators";

@Component({
  selector: 'app-subcontractor-item-table',
  templateUrl: './subcontractor-item-table.component.html',
  styleUrls: ['./subcontractor-item-table.component.css']
})
export class SubcontractorItemTableComponent implements OnInit, AfterViewInit {

  @Input()
  passedWorkOrderId: any;

  @Output()
  totalChangedEvent: EventEmitter<number> = new EventEmitter();

  componentTotal: number = 0;

  displayedColumns: string[] = ['createdDate', 'subcontractor', 'notes', 'unitPrice', 'qty', 'totalPrice', 'actions'];
  dataSource: any;

  @ViewChild(MatTable)
  entityTable!: MatTable<SubcontractorItem>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: SubcontractorItemService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    //    this.buildTable();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.buildTable();
  }

 buildTable() {
   this.componentTotal = 0;
    this.entityService.getAll()
      .pipe(map(items =>
        items.filter(item => (item.workOrder.id == this.passedWorkOrderId))))
      .subscribe(data => {
        data.forEach(a => this.componentTotal += a.totalPrice);
        this.totalChangedEvent.emit(this.componentTotal);
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
    addDialogConfig.data = { woId: this.passedWorkOrderId };
    const addDialogRef = this.dialog.open(SubcontractorItemAddComponent, addDialogConfig);
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
    editDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const editDialogRef = this.dialog.open(SubcontractorItemEditComponent, editDialogConfig);
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
    deleteDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
    const deleteDialogRef = this.dialog.open(SubcontractorItemDeleteComponent, deleteDialogConfig);
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

