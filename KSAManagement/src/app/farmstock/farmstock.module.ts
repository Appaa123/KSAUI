import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmstockRoutingModule } from './farmstock-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    FarmstockRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
    
  ],
  providers: [
    provideHttpClient(withFetch()),
    // other providers...
  ],
})
export class FarmstockModule { }
