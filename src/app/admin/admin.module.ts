import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing/admin-routing.module";

// main component of AdminModule...
import { AdminComponent } from './admin/admin.component';
// material module
import { MaterialKitModule} from "../shared/material-kit/material-kit.module";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";


// table Components declared by this module
import { CustomerTableComponent } from './tables/customer-table/customer-table.component';
import { InventoryGroupTableComponent} from "./tables/inventory-group-table/inventory-group-table.component";
// import { InventoryItemTableComponent} from "./tables/inventory-item-table/inventory-item-table.component";
import { InventoryLocationTableComponent} from "./tables/inventory-location-table/inventory-location-table.component";
import { InventoryTableComponent } from "./tables/inventory-table/inventory-table.component";
// import { LaborItemTableComponent} from "./tables/labor-item-table/labor-item-table.component";
import { LaborTableComponent} from "./tables/labor-table/labor-table.component";
import { LocationTableComponent} from "./tables/location-table/location-table.component";
// import { SubcontractorItemTableComponent} from "./tables/subcontractor-item-table/subcontractor-item-table.component";
import { SubcontractorTableComponent} from "./tables/subcontractor-table/subcontractor-table.component";
// import { ToolEquipmentItemTableComponent} from "./tables/tool-equipment-item-table/tool-equipment-item-table.component";
import { ToolEquipmentTableComponent} from "./tables/tool-equipment-table/tool-equipment-table.component";
import { UserGroupTableComponent } from "./tables/user-group-table/user-group-table.component";
import { UserTableComponent} from "./tables/user-table/user-table.component";
import { WorkOrderTableComponent} from "./tables/work-order-table/work-order-table.component";



import { ReactiveFormsModule } from "@angular/forms";
import { CustomerAddComponent } from './dialogs/customer-add/customer-add.component';
import { CustomerEditComponent } from './dialogs/customer-edit/customer-edit.component';
import { CustomerDeleteComponent } from './dialogs/customer-delete/customer-delete.component';
import { LocationAddComponent } from './dialogs/location-add/location-add.component';
import { LocationEditComponent } from './dialogs/location-edit/location-edit.component';
import { LocationDeleteComponent } from './dialogs/location-delete/location-delete.component';
import { InventoryAdminComponent } from './admin/inventory-admin/inventory-admin.component';
import { WorkOrderAddComponent } from './dialogs/work-order-add/work-order-add.component';
import { WorkOrderEditComponent } from './dialogs/work-order-edit/work-order-edit.component';
import { WorkOrderDeleteComponent } from './dialogs/work-order-delete/work-order-delete.component';
import { InventoryAddComponent } from './dialogs/inventory-add/inventory-add.component';
import { InventoryEditComponent } from './dialogs/inventory-edit/inventory-edit.component';
import { InventoryDeleteComponent } from './dialogs/inventory-delete/inventory-delete.component';
import { InventoryGroupAddComponent } from './dialogs/inventory-group-add/inventory-group-add.component';
import { InventoryGroupEditComponent } from './dialogs/inventory-group-edit/inventory-group-edit.component';
import { InventoryGroupDeleteComponent } from './dialogs/inventory-group-delete/inventory-group-delete.component';
import { InventoryLocationAddComponent } from './dialogs/inventory-location-add/inventory-location-add.component';
import { InventoryLocationEditComponent } from './dialogs/inventory-location-edit/inventory-location-edit.component';
import { InventoryLocationDeleteComponent } from './dialogs/inventory-location-delete/inventory-location-delete.component';
import { SubcontractorAddComponent } from './dialogs/subcontractor-add/subcontractor-add.component';
import { SubcontractorEditComponent } from './dialogs/subcontractor-edit/subcontractor-edit.component';
import { SubcontractorDeleteComponent } from './dialogs/subcontractor-delete/subcontractor-delete.component';
import { LaborAddComponent } from './dialogs/labor-add/labor-add.component';
import { LaborEditComponent } from './dialogs/labor-edit/labor-edit.component';
import { LaborDeleteComponent } from './dialogs/labor-delete/labor-delete.component';
import { ToolEquipmentAddComponent } from './dialogs/tool-equipment-add/tool-equipment-add.component';
import { ToolEquipmentEditComponent } from './dialogs/tool-equipment-edit/tool-equipment-edit.component';
import { ToolEquipmentDeleteComponent } from './dialogs/tool-equipment-delete/tool-equipment-delete.component';

// table components
const AdminModuleTableComponents = [
  CustomerTableComponent,
  InventoryTableComponent,
  InventoryGroupTableComponent,

  InventoryLocationTableComponent,
  LaborTableComponent,

  LocationTableComponent,
  SubcontractorTableComponent,

  ToolEquipmentTableComponent,

  UserTableComponent,
  UserGroupTableComponent,
  WorkOrderTableComponent,
];

@NgModule({
  // components, pipes, and directives provided by this module
  declarations: [
    AdminComponent,
    AdminModuleTableComponents,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerDeleteComponent,
    LocationAddComponent,
    LocationEditComponent,
    LocationDeleteComponent,
    InventoryAdminComponent,
    WorkOrderAddComponent,
    WorkOrderEditComponent,
    WorkOrderDeleteComponent,
    InventoryAddComponent,
    InventoryEditComponent,
    InventoryDeleteComponent,
    InventoryGroupAddComponent,
    InventoryGroupEditComponent,
    InventoryGroupDeleteComponent,
    InventoryLocationAddComponent,
    InventoryLocationEditComponent,
    InventoryLocationDeleteComponent,
    SubcontractorAddComponent,
    SubcontractorEditComponent,
    SubcontractorDeleteComponent,
    LaborAddComponent,
    LaborEditComponent,
    LaborDeleteComponent,
    ToolEquipmentAddComponent,
    ToolEquipmentEditComponent,
    ToolEquipmentDeleteComponent,
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
