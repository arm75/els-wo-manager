import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTreeNestedDataSource} from "@angular/material/tree";
import { NestedTreeControl} from "@angular/cdk/tree";
import { InventoryGroup } from "../../../core/models/inventory-group";
import { InventoryGroupService } from "../../../core/services/inventory-group.service";
import {MatIconRegistry} from "@angular/material/icon";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-inventory-admin',
  templateUrl: './inventory-admin.component.html',
  styleUrls: ['./inventory-admin.component.css']
})
export class InventoryAdminComponent implements OnInit, AfterViewInit {


  treeControl = new NestedTreeControl<InventoryGroup>(node => node.children);
  dataSource = new MatTreeNestedDataSource<InventoryGroup>();

  filterGroupId!: number;

  @ViewChild(MatDrawer)
  sideDrawer!: MatDrawer;

  constructor(
    private entityService: InventoryGroupService,
    private matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry.addSvgIcon('openedfolder', '/src/assets/icons8-opened-folder.svg');
  }

  ngOnInit(): void {
    this.entityService.getAllWithChildren()
      .subscribe(
      data => {
        this.dataSource.data = data;
      },error => {
      }
    );
    //this.sideDrawer.toggle();
  }

  ngAfterViewInit() {
    // console.log("ngAfterViewInit:\n");
    // console.log(this.dataSource.data);
  }

  hasChild = (_: number, node: InventoryGroup) => !!node.children && node.children.length > 0;

  setFilterGroupId(groupId: number) {
    //console.log("setFilterGroupId ran. number is: " + groupId);
    this.filterGroupId = groupId;
  }

}
