import { Component, OnInit, AfterViewInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { InventoryItemService } from "../../../core/services/inventory-item.service";
import { InventoryItem } from "../../../core/models/inventory-item";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { InventoryItemAddComponent } from "../../dialogs/inventory-item-add/inventory-item-add.component";
import { InventoryItemEditComponent } from "../../dialogs/inventory-item-edit/inventory-item-edit.component";
import { InventoryItemDeleteComponent } from "../../dialogs/inventory-item-delete/inventory-item-delete.component";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-inventory-item-table',
  templateUrl: './inventory-item-table.component.html',
  styleUrls: ['./inventory-item-table.component.css']
})
export class InventoryItemTableComponent implements OnInit, AfterViewInit {

  @Input()
  passedWorkOrderId: any;

  @Output()
  totalChangedEvent: EventEmitter<number> = new EventEmitter();

  componentTotal: number = 0;

  displayedColumns: string[] = ['createdDate', 'inventory', 'notes', 'unitPrice', 'qty', 'totalPrice', 'actions'];
  dataSource: any;

  @ViewChild(MatTable)
  entityTable!: MatTable<InventoryItem>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private entityService: InventoryItemService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    // this.buildTable();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.buildTable();
  }

 buildTable() {
   this.componentTotal = 0;
   this.entityService.getAll()
     .pipe(map(items =>
       items.filter(item => (item.workOrderId == this.passedWorkOrderId))))
     .subscribe(data => {
       data.forEach(a => this.componentTotal += a.totalPrice);
       console.log("total inv price: " + this.componentTotal);
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
    const addDialogRef = this.dialog.open(InventoryItemAddComponent, addDialogConfig);
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
    const editDialogRef = this.dialog.open(InventoryItemEditComponent, editDialogConfig);
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
    const deleteDialogRef = this.dialog.open(InventoryItemDeleteComponent, deleteDialogConfig);
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

