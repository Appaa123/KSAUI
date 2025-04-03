import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
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
export class FarmstockComponent implements OnInit, DoCheck, OnDestroy {
  data:any[] = [];
  isOffcanvasOpen: boolean = false;
  farmStockSubscription!: Subscription;
  private previousData = '';
   constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}
   
   getFarmStockData(){
    console.log('📡 Fetching fresh data...');
    this.farmStockSubscription = this.http.get<any>("https://ksaapi.onrender.com/api/FarmStock").subscribe({
      next: (response) => {
        console.log('✅ API Response:', response);
        this.data = response;
        //this.cdRef.detectChanges();  // 🔹 Force UI update
        console.log(this.data);
      },
      error: (error) => {
        console.error('Error fetching farmstock data', error);
      },
    });
    this.farmStockSubscription.unsubscribe();
   }

   ngOnInit(): void {
    console.log('🚀 ngOnInit() triggered!'); 
      this.getFarmStockData();
  }

  ngDoCheck(): void {
      const currentData = JSON.stringify(this.data);
      console.log("DoCheck....");
      if(this.previousData !== currentData){
        this.previousData = currentData;
        this.getFarmStockData();
      }
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
