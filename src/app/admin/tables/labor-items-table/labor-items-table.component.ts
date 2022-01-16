import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { LaborItemService } from "../../../core/services/labor-item.service";
import { LaborItem } from "../../../core/models/labor-item";

@Component({
  selector: 'app-labor-items-table',
  templateUrl: './labor-items-table.component.html',
  styleUrls: ['./labor-items-table.component.css']
})
export class LaborItemsTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
