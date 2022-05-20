import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { CustomerService } from "../../../core/services/customer.service";
import { Customer } from "../../../core/models/customer";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CustomerAddComponent } from "../../dialogs/customer-add/customer-add.component";
import { CustomerEditComponent } from "../../dialogs/customer-edit/customer-edit.component";
import { CustomerDeleteComponent } from "../../dialogs/customer-delete/customer-delete.component";
import {AuthenticationService} from "../../../core/security/authentication.service";
import {interval, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {

  loggedInUser: any;
  loggedInUsername: any;
  loggedInRole: any;
  nameToDisplay: any;

  displayedColumns: any;
  dataSource: any;
  data: any;
  filter: any;

  // @ViewChild(MatTable, {static: false}) table : MatTable // initialize

  //then this.table.renderRows();

  @ViewChild(MatTable, {static: false})
  entityTable!: MatTable<Customer[]>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  //timerEvent: number = 0;

  tableObs$: any;

  constructor(
    private entityService: CustomerService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.loggedInUser = this.authenticationService.getUserFromLocalStorage();
    this.loggedInUsername = this.loggedInUser.username;
    this.loggedInRole = this.loggedInUser.role;
    this.nameToDisplay = this.loggedInUser!.firstName;

    this.displayedColumns = ['id', 'entityName', 'phoneNumb', 'emailAddress', 'actions'];
  }

  ngOnInit() {
    this.setupComponent().finally(() => {});
  }

  async setupComponent() {

    const refreshTimer$ = interval(30000);
    refreshTimer$.subscribe((data)=>{
      console.log("refresh event #:", data);
      this.refreshTable();
    });

    // get the table..
    await this.buildTable();
    // configure table
    await this.configTable();
  }

  async buildTable() {

    // const obs$ = this.entityService.getAll();
    //this.dataSource = new MatTableDataSource(obs$);

    // this.tableObs$ =
    //   this.entityService.getAll().pipe(
    //     map(things => {
    //       this.dataSource = new MatTableDataSource<Customer[]>();
    //       this.dataSource.data = things;
    //       return this.dataSource;
    //     }));
    this.tableObs$ = this.entityService.getAll().subscribe(
      data => { this.dataSource = new MatTableDataSource(data); }
    );



    // .toPromise()
    // .then(data => { this.data = data })
    // .finally( () => { this.dataSource = new MatTableDataSource(this.data); });


    // await this.entityService.getAll()
    //   .toPromise()
    //   .then(data => { this.data = data })
    //   .finally( () => { this.dataSource = new MatTableDataSource(this.data); });

  }

  async configTable() {
    this.sort.active = 'id';
    this.sort.direction = 'desc';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  refreshTable() {
    // const a = this.entityTable.dataSource;
    // this.tableObs$ = this.entityService.getAll().subscribe(
    //   data => { this.dataSource = new MatTableDataSource(data) }
    // );

    this.tableObs$ = this.entityService.getAll().subscribe(
      data => { this.dataSource = data; }
    );
    this.changeDetectorRefs.detectChanges();
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
    const addDialogRef = this.dialog.open(CustomerAddComponent, addDialogConfig);
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
    const editDialogRef = this.dialog.open(CustomerEditComponent, editDialogConfig);
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
    const deleteDialogRef = this.dialog.open(CustomerDeleteComponent, deleteDialogConfig);
    await deleteDialogRef.afterClosed().toPromise()
      .finally( () => { this.setupComponent(); });
  }

}
