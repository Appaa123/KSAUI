import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent }, // Define the route for the feature component
  // you can add other child routes here if needed
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FeatureRoutingModule { }
