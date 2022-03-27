import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FlatTreeControl} from "@angular/cdk/tree";
import {UserGroupService} from "../../../core/services/user-group.service";
import {UserGroup} from "../../../core/models/user-group";
import {InventoryGroup} from "../../../core/models/inventory-group";
import {InventoryGroupService} from "../../../core/services/inventory-group.service";

interface FoodNode {
  name: string;
  children?: FoodNode[];
}
const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [ {name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}, ]
  },
  {
    name: 'Vegetables',
    children: [ { name: 'Green',
      children: [ {name: 'Broccoli'}, {name: 'Brussels sprouts'}, ]
    },
      {
        name: 'Orange',
        children: [ {name: 'Pumpkins'}, {name: 'Carrots'}, ] },
    ]
  },
];
/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-inventory-admin',
  templateUrl: './inventory-admin.component.html',
  styleUrls: ['./inventory-admin.component.css']
})
export class InventoryAdminComponent implements OnInit {

  showFiller = true;
  drawer!: any;
  tree_data: any;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private entityService: InventoryGroupService) {
    //this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.dataSource.data = TREE_DATA;
    this.entityService.getAll().subscribe(
      data => {
        this.tree_data = data;
      },error => {
      }
    );
  }

}
