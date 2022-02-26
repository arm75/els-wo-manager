import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ElsWoManagerConstants } from "./els-wo-manager-constants";

// Model Services
import { CustomerService } from "./services/customer.service";
import { InventoryService } from "./services/inventory.service";
import { InventoryGroupService } from "./services/inventory-group.service";
import { InventoryItemService } from "./services/inventory-item.service";
import { InventoryLocationService } from "./services/inventory-location.service";
import { LaborService } from "./services/labor.service";
import { LaborItemService } from "./services/labor-item.service";
import { LocationService } from "./services/location.service";
import { SubcontractorService } from "./services/subcontractor.service";
import { SubcontractorItemService } from "./services/subcontractor-item.service";
import { ToolEquipmentService } from "./services/tool-equipment.service";
import { ToolEquipmentItemService } from "./services/tool-equipment-item.service";
import { UserService } from "./services/user.service";
import { UserGroupService } from "./services/user-group.service";
import { WorkOrderService } from "./services/work-order.service";

// model services providers array
const ModelServiceProviders = [
  CustomerService,
  InventoryService,
  InventoryGroupService,
  InventoryItemService,
  InventoryLocationService,
  LaborService,
  LaborItemService,
  LocationService,
  SubcontractorService,
  SubcontractorItemService,
  ToolEquipmentService,
  ToolEquipmentItemService,
  UserService,
  UserGroupService,
  WorkOrderService,
];

@NgModule({
  declarations: []
  ,
  imports: [
    HttpClientModule,
  ],
  providers: [
    ElsWoManagerConstants,
    ModelServiceProviders,
    HttpClientModule
  ],
  exports: [
  ],
})
export class CoreModule { }
