import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing/admin-routing.module";

// main component of AdminModule...
import { AdminComponent } from './admin/admin.component';
// material module
import { MaterialKitModule} from "../shared/material-kit/material-kit.module";

// table Components declared by this module
import { CustomersTableComponent } from './tables/customers-table/customers-table.component';
import { InventoryGroupsTableComponent} from "./tables/inventory-groups-table/inventory-groups-table.component";
import { InventoryItemsTableComponent} from "./tables/inventory-items-table/inventory-items-table.component";
import { InventoryLocationsTableComponent} from "./tables/inventory-locations-table/inventory-locations-table.component";
import { InventoryTableComponent } from "./tables/inventory-table/inventory-table.component";
import { LaborItemsTableComponent} from "./tables/labor-items-table/labor-items-table.component";
import { LaborTableComponent} from "./tables/labor-table/labor-table.component";
import { LocationsTableComponent} from "./tables/locations-table/locations-table.component";
import { SubcontractorItemsTableComponent} from "./tables/subcontractor-items-table/subcontractor-items-table.component";
import { SubcontractorsTableComponent} from "./tables/subcontractors-table/subcontractors-table.component";
import { ToolEquipmentItemsTableComponent} from "./tables/tool-equipment-items-table/tool-equipment-items-table.component";
import { ToolsEquipmentTableComponent} from "./tables/tools-equipment-table/tools-equipment-table.component";
import { UserGroupsTableComponent } from "./tables/user-groups-table/user-groups-table.component";
import { UsersTableComponent} from "./tables/users-table/users-table.component";
import { WorkOrdersTableComponent} from "./tables/work-orders-table/work-orders-table.component";

import { ReactiveFormsModule } from "@angular/forms";
import { CustomerAddComponent } from './dialogs/customer-add/customer-add.component';
import { CustomerEditComponent } from './dialogs/customer-edit/customer-edit.component';
import { CustomerDeleteComponent } from './dialogs/customer-delete/customer-delete.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import { TestPageComponent } from './test-page/test-page.component';
import { TestDialogComponent } from './test-dialog/test-dialog.component';

// table components
const AdminModuleTableComponents = [
  CustomersTableComponent,
  InventoryTableComponent,
  InventoryGroupsTableComponent,
  InventoryItemsTableComponent,
  InventoryLocationsTableComponent,
  LaborTableComponent,
  LaborItemsTableComponent,
  LocationsTableComponent,
  SubcontractorsTableComponent,
  SubcontractorItemsTableComponent,
  ToolsEquipmentTableComponent,
  ToolEquipmentItemsTableComponent,
  UsersTableComponent,
  UserGroupsTableComponent,
  WorkOrdersTableComponent,
];

@NgModule({
  // components, pipes, and directives provided by this module
  declarations: [
    AdminComponent,
    AdminModuleTableComponents,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerDeleteComponent,
    TestPageComponent,
    TestDialogComponent,
  ],
  // modules that this module needs to use
  imports: [
    CommonModule,
    MaterialKitModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  providers:[
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ],
  entryComponents: [
    CustomerAddComponent,
  ]
})
export class AdminModule { }
