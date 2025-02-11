import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmstockComponent } from './farmstock/farmstock.component';

const routes: Routes = [
  { path: 'farmstock', component: FarmstockComponent }, // Define the route for the feature component
  // you can add other child routes here if needed
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmstockRoutingModule { }
