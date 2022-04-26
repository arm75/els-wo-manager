// angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// interceptors
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./core/security/auth.interceptor";
// modules
import { CoreModule } from "./core/core.module";
import { AdminModule } from "./admin/admin.module";
import { WorkOrdersModule } from "./work-orders/work-orders.module";
import { WorkOrderDetailsModule } from "./work-order-details/work-order-details.module";
// services
import { AuthenticationService } from "./core/security/authentication.service";
import { UserService } from "./core/services/user.service";
// guards
import { AuthGuard } from "./core/security/auth.guard";
// components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
// import { GlobalProgressSpinnerComponent } from './shared/progress-spinner/global-progress-spinner/global-progress-spinner.component';
import {MaterialKitModule} from "./shared/material-kit/material-kit.module";
import { UserProfileComponent } from './shared/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UserProfileComponent,
  ],
    imports: [
        CoreModule,
        AdminModule,
        WorkOrdersModule,
        WorkOrderDetailsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialKitModule
    ],
  providers: [
    AuthInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthenticationService,
    UserService,
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
