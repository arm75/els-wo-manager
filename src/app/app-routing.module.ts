import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from "./admin/admin/admin.component";
import { WorkOrdersComponent } from "./work-orders/work-orders/work-orders.component";
import { WorkOrderDetailsComponent } from "./work-order-details/work-order-details/work-order-details.component";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: 'workOrders', component: WorkOrdersComponent },
  { path: 'workOrderDetails/:passedId', component: WorkOrderDetailsComponent },
  { path: '', redirectTo: '/workOrders', pathMatch: 'full' },
  //{ path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
