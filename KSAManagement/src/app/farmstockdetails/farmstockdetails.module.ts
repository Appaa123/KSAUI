import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmstockdetailsRoutingModule } from './farmstockdetails-routing.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FarmstockdetailsRoutingModule,
    NavbarComponent
  ]
})
export class FarmstockdetailsModule { }
