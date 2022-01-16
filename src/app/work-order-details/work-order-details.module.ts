import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

// main component of WorkOrdersModule...
import { WorkOrderDetailsComponent } from './work-order-details/work-order-details.component';
// material module
import { MaterialKitModule } from "../shared/material-kit/material-kit.module";

@NgModule({
  declarations: [
    WorkOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialKitModule,
    RouterModule,
  ]
})
export class WorkOrderDetailsModule { }
