import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

// main component of WorkOrdersModule...
import { WorkOrdersComponent } from './work-orders/work-orders.component';
// material module
import { MaterialKitModule } from "../shared/material-kit/material-kit.module";
import {AuthGuard} from "../core/security/auth.guard";
import {AuthenticationService} from "../core/security/authentication.service";
import {UserService} from "../core/services/user.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../core/security/auth.interceptor";
import { WorkOrderUsersTableComponent } from './tables/work-order-users-table/work-order-users-table.component';
import { ToolEquipmentReturnTableComponent } from './tables/tool-equipment-return-table/tool-equipment-return-table.component';
import {WorkOrderUsersEditComponent} from "./dialogs/work-order-users-edit/work-order-users-edit.component";
import {WorkOrderUsersAddComponent} from "./dialogs/work-order-users-add/work-order-users-add.component";
import {WorkOrderUsersDeleteComponent} from "./dialogs/work-order-users-delete/work-order-users-delete.component";
import {ToolEquipmentReturnAddComponent} from "./dialogs/tool-equipment-return-add/tool-equipment-return-add.component";
import {
  ToolEquipmentReturnEditComponent
} from "./dialogs/tool-equipment-return-edit/tool-equipment-return-edit.component";
import {
  ToolEquipmentReturnDeleteComponent
} from "./dialogs/tool-equipment-return-delete/tool-equipment-return-delete.component";
import {ReactiveFormsModule} from "@angular/forms";
import { SubcontractorCompletionTableComponent } from './tables/subcontractor-completion-table/subcontractor-completion-table.component';

@NgModule({
  declarations: [
    WorkOrdersComponent,
    WorkOrderUsersTableComponent,
    WorkOrderUsersAddComponent,
    WorkOrderUsersEditComponent,
    WorkOrderUsersDeleteComponent,
    ToolEquipmentReturnTableComponent,
    ToolEquipmentReturnAddComponent,
    ToolEquipmentReturnEditComponent,
    ToolEquipmentReturnDeleteComponent,
    SubcontractorCompletionTableComponent
  ],
  imports: [
    CommonModule,
    MaterialKitModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthenticationService,
    UserService,
  ]
})
export class WorkOrdersModule { }
