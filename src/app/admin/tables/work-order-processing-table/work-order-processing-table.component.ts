import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {WorkOrder} from "../../../core/models/work-order";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatSelect} from "@angular/material/select";
import {ElsWoManagerConstants} from "../../../core/els-wo-manager-constants";
import {WorkOrderService} from "../../../core/services/work-order.service";
import {CustomerService} from "../../../core/services/customer.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {map} from "rxjs/operators";
import {WorkOrderAddComponent} from "../../dialogs/work-order-add/work-order-add.component";
import {WorkOrderEditComponent} from "../../dialogs/work-order-edit/work-order-edit.component";
import {WorkOrderCompleteComponent} from "../../dialogs/work-order-complete/work-order-complete.component";
import {WorkOrderDeleteComponent} from "../../dialogs/work-order-delete/work-order-delete.component";

@Component({
  selector: 'app-work-order-processing-table',
  templateUrl: './work-order-processing-table.component.html',
  styleUrls: ['./work-order-processing-table.component.css']
})
export class WorkOrderProcessingTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['createdDate', 'id', 'quickDescription', 'customer', 'location', 'status', 'workOrderTotal', 'actions'];

  dataSource: any;

  @ViewChild(MatTable)
  entityTable!: MatTable<WorkOrder>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  /////////////////////////////////////////////////////////////////////////////////////

  @ViewChild('workOrderFilterSelect')
  workOrderFilterSelect!: MatSelect;
  workOrderFilterSelected: string = 'ALL';
  loadedCustomers: any;

  //////////////////////////////////////////////////////////////////////////////////////
  dropdownFilterSelected: any;
  dropdownFilterArray = ElsWoManagerConstants.workOrderStatusFilterArray;

  constructor(
    private entityService: WorkOrderService,
    private customerService: CustomerService, ///////////////////////////////
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    //private spinner: GlobalProgressSpinnerComponent
  ) {
    this.buildTable();

    /////////////////////////////////////////////////////////////////
    this.customerService.getAll().subscribe(
      data => {
        //console.log(data);
        this.loadedCustomers = data;
      },
      error => {
        //console.log(error);
      }
    );
    /////////////////////////////////////////////////////////////////





  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.buildTable();
    // this.spinner.initiate();  |  does not work yet...
  }

  menuButtonClick() {
    alert("Click");

  }



  buildTable() {
    switch(this.workOrderFilterSelected) {
      case 'ALL': {
        this.entityService.getAll()
          .subscribe(data => {
            //console.log(data);
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
        break;
      }
      default: {
        this.entityService.getAll()
          .pipe(map(items =>
            items.filter(item => ((item.status == this.workOrderFilterSelected)))))
          .subscribe(data => {
            //console.log(data);
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
        break;
      }
    }
  }

  selectChange() {
    // console.log(this.workOrderFilterSelected)
    // alert("You selected" + this.workOrderFilterSelected);
    this.buildTable();
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
    const addDialogRef = this.dialog.open(WorkOrderAddComponent, addDialogConfig);
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
    const editDialogRef = this.dialog.open(WorkOrderEditComponent, editDialogConfig);
    editDialogRef.afterClosed().subscribe(editData => {
      this.buildTable();
    });
  }

  // opens Complete Work Order box
  completeDialog( _id: number) {
    const completeDialogConfig = new MatDialogConfig();
    completeDialogConfig.disableClose = true;
    completeDialogConfig.autoFocus = true;
    completeDialogConfig.width = "25%";
    completeDialogConfig.position = { top:  '0' };
    completeDialogConfig.data = { entityId: _id };
    const completeDialogRef = this.dialog.open(WorkOrderCompleteComponent, completeDialogConfig);
    completeDialogRef.afterClosed().subscribe(completeData => {
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
    const deleteDialogRef = this.dialog.open(WorkOrderDeleteComponent, deleteDialogConfig);
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
