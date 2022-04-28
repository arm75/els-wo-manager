import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// main component of WorkOrdersModule...
import { WorkOrderDetailsComponent } from './work-order-details/work-order-details.component';
// material module
import { MaterialKitModule } from "../shared/material-kit/material-kit.module";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";

// table components declared by this module
import { InventoryItemTableComponent } from './tables/inventory-item-table/inventory-item-table.component';
import { LaborItemTableComponent } from './tables/labor-item-table/labor-item-table.component';
import { SubcontractorItemTableComponent } from './tables/subcontractor-item-table/subcontractor-item-table.component';
import { ToolEquipmentItemTableComponent } from './tables/tool-equipment-item-table/tool-equipment-item-table.component';

// dialog components declared by this module
import { InventoryItemAddComponent } from './dialogs/inventory-item-add/inventory-item-add.component';
import { InventoryItemEditComponent } from './dialogs/inventory-item-edit/inventory-item-edit.component';
import { InventoryItemDeleteComponent } from './dialogs/inventory-item-delete/inventory-item-delete.component';
import { LaborItemAddComponent } from './dialogs/labor-item-add/labor-item-add.component';
import { LaborItemEditComponent } from './dialogs/labor-item-edit/labor-item-edit.component';
import { LaborItemDeleteComponent } from './dialogs/labor-item-delete/labor-item-delete.component';
import { SubcontractorItemAddComponent } from './dialogs/subcontractor-item-add/subcontractor-item-add.component';
import { SubcontractorItemEditComponent } from './dialogs/subcontractor-item-edit/subcontractor-item-edit.component';
import { SubcontractorItemDeleteComponent } from './dialogs/subcontractor-item-delete/subcontractor-item-delete.component';
import { ToolEquipmentItemAddComponent } from './dialogs/tool-equipment-item-add/tool-equipment-item-add.component';
import { ToolEquipmentItemEditComponent } from './dialogs/tool-equipment-item-edit/tool-equipment-item-edit.component';
import { ToolEquipmentItemDeleteComponent } from './dialogs/tool-equipment-item-delete/tool-equipment-item-delete.component';

import { AuthenticationService } from "../core/security/authentication.service";
import { UserService } from "../core/services/user.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../core/security/auth.interceptor";
import { WorkOrderEditTabFormComponent } from './components/work-order-edit-tab-form/work-order-edit-tab-form.component';
import { NgxMaskModule } from "ngx-mask";
import { WorkOrderEditTabUsersComponent } from './components/work-order-edit-tab-users/work-order-edit-tab-users.component';
import { PrintTemplateComponent } from './work-order-details/print/print-template/print-template.component';
import { GlobalProgressSpinnerComponent } from "../shared/progress-spinner/global-progress-spinner/global-progress-spinner.component";
import { ToolEquipmentItemReturnComponent } from './dialogs/tool-equipment-item-return/tool-equipment-item-return.component';
import { SubcontractorItemCompleteComponent } from './dialogs/subcontractor-item-complete/subcontractor-item-complete.component';

// table components array
const WorkOrderDetailsModuleTableComponents = [
  InventoryItemTableComponent,
  LaborItemTableComponent,
  SubcontractorItemTableComponent,
  ToolEquipmentItemTableComponent,
];

// dialog components
const WorkOrderDetailsModuleDialogComponents = [
  InventoryItemAddComponent,
  InventoryItemEditComponent,
  InventoryItemDeleteComponent,
  LaborItemAddComponent,
  LaborItemEditComponent,
  LaborItemDeleteComponent,
  SubcontractorItemAddComponent,
  SubcontractorItemEditComponent,
  SubcontractorItemDeleteComponent,
  ToolEquipmentItemAddComponent,
  ToolEquipmentItemEditComponent,
  ToolEquipmentItemDeleteComponent
];

@NgModule({
  declarations: [
    WorkOrderDetailsComponent,
    WorkOrderDetailsModuleTableComponents,
    WorkOrderDetailsModuleDialogComponents,
    WorkOrderEditTabFormComponent,
    WorkOrderEditTabUsersComponent,
    PrintTemplateComponent,
    GlobalProgressSpinnerComponent,
    ToolEquipmentItemReturnComponent,
    SubcontractorItemCompleteComponent,
  ],
  imports: [
    CommonModule,
    MaterialKitModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule,
  ],
  providers:[
    AuthInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthenticationService,
    UserService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500, verticalPosition: 'bottom', horizontalPosition: 'center', panelClass: 'els-custom-snackbar' } }
  ],
})
export class WorkOrderDetailsModule { }
// verticalPosition:  Allowed values are  'top' | 'bottom'
// horizontalPosition: Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
