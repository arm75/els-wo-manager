import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import {LaborItemAddComponent} from "../../../work-order-details/dialogs/labor-item-add/labor-item-add.component";

@Component({
  selector: 'app-mat-table-test',
  templateUrl: './mat-table-test.component.html',
  styleUrls: ['./mat-table-test.component.css']
})
export class MatTableTestComponent implements OnInit {

  constructor(
    private inventoryGroupService: InventoryGroupService
  ) { }

  ngOnInit(): void {
  }

}
