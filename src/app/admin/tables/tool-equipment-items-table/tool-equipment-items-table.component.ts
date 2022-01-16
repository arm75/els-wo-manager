import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { ToolEquipmentItemService } from "../../../core/services/tool-equipment-item.service";
import { ToolEquipmentItem } from "../../../core/models/tool-equipment-item";

@Component({
  selector: 'app-tool-equipment-items-table',
  templateUrl: './tool-equipment-items-table.component.html',
  styleUrls: ['./tool-equipment-items-table.component.css']
})
export class ToolEquipmentItemsTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
