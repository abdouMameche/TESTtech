import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';





export const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'dashboard', component: DashboardComponent } 
  , 
  //{ path: 'dialog', component: ConfirmDialogComponent } ,

  { path: '', redirectTo: '/login', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
