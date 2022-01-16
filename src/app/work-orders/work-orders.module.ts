import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

// main component of WorkOrdersModule...
import { WorkOrdersComponent } from './work-orders/work-orders.component';
// material module
import { MaterialKitModule } from "../shared/material-kit/material-kit.module";

@NgModule({
  declarations: [
    WorkOrdersComponent,
  ],
  imports: [
    CommonModule,
    MaterialKitModule,
    RouterModule
  ]
})
export class WorkOrdersModule { }
