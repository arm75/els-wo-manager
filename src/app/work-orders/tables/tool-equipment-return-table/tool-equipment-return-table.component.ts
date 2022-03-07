import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ToolEquipmentItem} from "../../../core/models/tool-equipment-item";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {ToolEquipmentItemService} from "../../../core/services/tool-equipment-item.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {map} from "rxjs/operators";
import {
  ToolEquipmentItemAddComponent
} from "../../../work-order-details/dialogs/tool-equipment-item-add/tool-equipment-item-add.component";
import {
  ToolEquipmentItemEditComponent
} from "../../../work-order-details/dialogs/tool-equipment-item-edit/tool-equipment-item-edit.component";
import {
  ToolEquipmentItemDeleteComponent
} from "../../../work-order-details/dialogs/tool-equipment-item-delete/tool-equipment-item-delete.component";

@Component({
  selector: 'app-tool-equipment-return-table',
  templateUrl: './tool-equipment-return-table.component.html',
  styleUrls: ['./tool-equipment-return-table.component.css']
})
export class ToolEquipmentReturnTableComponent implements OnInit {

  @Input()
  passedWorkOrderId: any;

  @Output()
  totalChangedEvent: EventEmitter<number> = new EventEmitter();

  componentTotal: number = 0;

  displayedColumns: string[] = ['createdDate', 'toolEquipment', 'workOrder', 'notes', 'pricePerDay', 'days', 'totalPrice', 'status', 'actions'];
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
    //  this.buildTable();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.buildTable();
  }

  buildTable() {
    this.componentTotal = 0;
    this.entityService.getAll()
      // .pipe(map(items =>
      //   items.filter(item => (item.workOrderId == this.passedWorkOrderId))))
      .subscribe(data => {
        data.forEach(a => this.componentTotal += a.totalPrice);
        console.log("total toolequip price: " + this.componentTotal);
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
    editDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
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
    deleteDialogConfig.data = { woId: this.passedWorkOrderId, entityId: _id };
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

  alert(returnedToolEquipment: string) {
    alert(returnedToolEquipment);
  }
}
