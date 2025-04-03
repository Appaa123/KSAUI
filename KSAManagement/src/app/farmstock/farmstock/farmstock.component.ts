import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { error } from 'console';
import { response } from 'express';
import { catchError, Subscription, tap, throwIfEmpty } from 'rxjs';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-farmstock',
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './farmstock.component.html',
  styleUrl: './farmstock.component.css'
})
export class FarmstockComponent implements OnInit, OnDestroy {
  data:any[] = [];
  isOffcanvasOpen: boolean = false;
  farmStockSubscription!: Subscription;
  selectedRecord: any = {}; // Store selected record
  deleteModal: any; // Reference to modal instance
  //private previousData = '';
   constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}
   
   getFarmStockData(){
    if (this.farmStockSubscription) {
      this.farmStockSubscription.unsubscribe();
      console.log('Unsubscribed from farm stock API');
    }
    console.log('📡 Fetching fresh data...');
    this.farmStockSubscription = this.http.get<any>("https://ksaapi.onrender.com/api/FarmStock",
      {
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
        params: { '_t': new Date().getTime().toString() } // Prevents browser caching
      }).subscribe({
      next: (response) => {
        console.log('✅ API Response:', response);
        this.data = response;
        //this.cdRef.detectChanges();  // 🔹 Force UI update
        console.log(this.data);
      },
      error: (error) => {
        console.error('❌ Error fetching farmstock data', error);
      },
    });
   }

   openEditModal(record: any) {
    this.selectedRecord = { ...record }; // Clone the record to avoid modifying the original data
    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  }

  openDeleteModal(record: any) {
    this.selectedRecord = record;
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    this.deleteModal.show();
  }

  deleteRecord(): void{
    console.log('Deleting Record:', this.selectedRecord);
    
    // Simulate API delete request
    //this.data = this.data.filter(item => item.id !== this.selectedRecord.id);
    const apiURL = "https://ksaapi.onrender.com/api/FarmStock";
        
        this.http.delete(apiURL, 
          {headers: { 'Content-Type': 'application/json' },
            params: {'Id': this.selectedRecord.Id}}).pipe(
          tap(response => console.log("Success!", response)),
          catchError(error => {
            console.error('Error:', error);
            throw error;
          })
        );
  
    // Close the modal
    this.deleteModal.hide();
    
  }
  
  saveChanges() {
    console.log('Updated Record:', this.selectedRecord);
    const apiURL = "https://ksaapi.onrender.com/api/FarmStock";
        
        this.http.put(apiURL, 
          {headers: { 'Content-Type': 'application/json' },
            params: {'Id': this.selectedRecord.Id}}).pipe(
          tap(response => console.log("Success!", response)),
          catchError(error => {
            console.error('Error:', error);
            throw error;
          })
        );
    }

   ngOnInit(): void {
    console.log('🚀 ngOnInit() triggered!'); 
      this.getFarmStockData();
  }

  // ngDoCheck(): void {
  //     const currentData = JSON.stringify(this.data);
  //     console.log("DoCheck....");
  //     if(this.previousData !== currentData){
  //       this.previousData = currentData;
  //       this.getFarmStockData();
  //     }
  // }  

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
