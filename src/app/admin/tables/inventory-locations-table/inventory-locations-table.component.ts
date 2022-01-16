import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { InventoryLocationService } from "../../../core/services/inventory-location.service";
import { InventoryLocation } from "../../../core/models/inventory-location";

@Component({
  selector: 'app-inventory-locations-table',
  templateUrl: './inventory-locations-table.component.html',
  styleUrls: ['./inventory-locations-table.component.css']
})
export class InventoryLocationsTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'locationName', 'phoneNumb', 'emailAddr'];
  dataSource!: MatTableDataSource<InventoryLocation>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(private inventoryLocationService: InventoryLocationService, private _liveAnnouncer: LiveAnnouncer) {
    this.inventoryLocationService.getInventoryLocations().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngAfterViewInit() {
    this.inventoryLocationService.getInventoryLocations().subscribe(data => {
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
