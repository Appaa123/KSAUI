import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmstockdetailsComponent } from './farmstockdetails/farmstockdetails.component';

const routes: Routes = [
  { path: 'farmstockdetails', component: FarmstockdetailsComponent, }, // Define the route for the feature component
  // you can add other child routes here if needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmstockdetailsRoutingModule { }
