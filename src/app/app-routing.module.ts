import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkOrdersComponent } from "./work-orders/work-orders/work-orders.component";
import { WorkOrderDetailsComponent } from "./work-order-details/work-order-details/work-order-details.component";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { LoginComponent } from "./core/security/login/login.component";
import { AuthGuard } from "./core/security/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'workOrders', component: WorkOrdersComponent, canActivate:[AuthGuard] },
  { path: 'workOrderDetails/:passedId', component: WorkOrderDetailsComponent, canActivate:[AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  providers:[
    AuthGuard
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
