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

@NgModule({
  declarations: [
    WorkOrdersComponent,
  ],
  imports: [
    CommonModule,
    MaterialKitModule,
    RouterModule
  ],
  providers: [
    AuthInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthenticationService,
    UserService,
  ]
})
export class WorkOrdersModule { }
