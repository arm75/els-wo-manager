import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { SubcontractorItemService } from "../../../core/services/subcontractor-item.service";
import { SubcontractorItem } from "../../../core/models/subcontractor-item";

@Component({
  selector: 'app-subcontractor-items-table',
  templateUrl: './subcontractor-items-table.component.html',
  styleUrls: ['./subcontractor-items-table.component.css']
})
export class SubcontractorItemsTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
