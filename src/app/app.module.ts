// angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// modules
import { AdminModule } from "./admin/admin.module";
import { WorkOrdersModule } from "./work-orders/work-orders.module";
import { WorkOrderDetailsModule } from "./work-order-details/work-order-details.module";
// components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { CoreModule } from "./core/core.module";


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CoreModule,
    AdminModule,
    WorkOrdersModule,
    WorkOrderDetailsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
