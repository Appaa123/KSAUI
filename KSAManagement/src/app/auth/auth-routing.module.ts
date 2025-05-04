import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {path:'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes),  // ✅ required in Angular 17+
  ]
})
export class AuthRoutingModule { }
