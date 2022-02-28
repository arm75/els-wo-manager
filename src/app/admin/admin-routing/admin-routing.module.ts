import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from "../admin/admin.component";
import { AuthGuard } from "../../core/security/auth.guard";

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  providers:[
    AuthGuard
  ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
