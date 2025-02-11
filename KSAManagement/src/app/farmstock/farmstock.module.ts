import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmstockRoutingModule } from './farmstock-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FarmstockRoutingModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    // other providers...
  ],
})
export class FarmstockModule { }
