import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import { InventoryGroup } from "../../../core/models/inventory-group";

@Component({
  selector: 'app-inventory-groups-table',
  templateUrl: './inventory-groups-table.component.html',
  styleUrls: ['./inventory-groups-table.component.css']
})
export class InventoryGroupsTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'groupName', 'description'];
  dataSource!: MatTableDataSource<InventoryGroup>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(private inventoryGroupService: InventoryGroupService, private _liveAnnouncer: LiveAnnouncer) {
    this.inventoryGroupService.getInventoryGroups().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngAfterViewInit() {
    this.inventoryGroupService.getInventoryGroups().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
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
