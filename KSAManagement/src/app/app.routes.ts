import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { FarmstockComponent } from './farmstock/farmstock/farmstock.component';
import { FarmstockdetailsComponent } from './farmstockdetails/farmstockdetails/farmstockdetails.component';
import { AuthComponent } from './auth/auth/auth.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'farmstock', component: FarmstockComponent},
    { path: 'farmstockdetails', component: FarmstockdetailsComponent},
    { path: 'auth', component: AuthComponent}
    //{ path: 'inventory', component: InventoryComponent },
    // other routes
  ];
