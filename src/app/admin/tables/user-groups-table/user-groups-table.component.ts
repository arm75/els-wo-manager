import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { UserGroupService } from "../../../core/services/user-group.service";
import { UserGroup } from "../../../core/models/user-group";

@Component({
  selector: 'app-user-groups-table',
  templateUrl: './user-groups-table.component.html',
  styleUrls: ['./user-groups-table.component.css']
})
export class UserGroupsTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'groupName', 'description'];
  dataSource!: MatTableDataSource<UserGroup>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(private userGroupService: UserGroupService, private _liveAnnouncer: LiveAnnouncer) {
    this.userGroupService.getUserGroups().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngAfterViewInit() {
    this.userGroupService.getUserGroups().subscribe(data => {
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
