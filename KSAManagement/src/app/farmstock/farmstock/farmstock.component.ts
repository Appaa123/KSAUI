import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { error } from 'console';
import { response } from 'express';
import { Subscription, throwIfEmpty } from 'rxjs';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-farmstock',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './farmstock.component.html',
  styleUrl: './farmstock.component.css'
})
export class FarmstockComponent implements OnInit, OnDestroy {
  data:any[] = [];
  isOffcanvasOpen: boolean = false;
  farmStockSubscription!: Subscription;
   constructor(private http: HttpClient) {}
   
   ngOnInit(): void {
    this.getFarmStockData();
  }

   getFarmStockData(){
    this.farmStockSubscription = this.http.get<any>("https://ksaapi.onrender.com/api/FarmStock").subscribe({
      next: (response) => {
        this.data = response;
        console.log(this.data);
      },
      error: (error) => {
        console.error('Error fetching farmstock data', error);
      },
    });

   }

   refreshData() {
    this.getFarmStockData();
  }

   toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }

  ngOnDestroy(): void {
    if (this.farmStockSubscription) {
      this.farmStockSubscription.unsubscribe();
      console.log('Unsubscribed from farm stock API');
    }
  }

}
