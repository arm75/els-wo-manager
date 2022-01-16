import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { ToolEquipmentService } from "../../../core/services/tool-equipment.service";
import { ToolEquipment } from "../../../core/models/tool-equipment";

@Component({
  selector: 'app-tools-equipment-table',
  templateUrl: './tools-equipment-table.component.html',
  styleUrls: ['./tools-equipment-table.component.css']
})
export class ToolsEquipmentTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'toolEquipName', 'description', 'rentalCost'];
  dataSource!: MatTableDataSource<ToolEquipment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(private toolEquipmentService: ToolEquipmentService, private _liveAnnouncer: LiveAnnouncer) {
    this.toolEquipmentService.getToolsEquipment().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngAfterViewInit() {
    this.toolEquipmentService.getToolsEquipment().subscribe(data => {
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
