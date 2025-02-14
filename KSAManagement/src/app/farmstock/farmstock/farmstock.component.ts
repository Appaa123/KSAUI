import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { error } from 'console';
import { response } from 'express';
import { throwIfEmpty } from 'rxjs';

@Component({
  selector: 'app-farmstock',
  imports: [],
  templateUrl: './farmstock.component.html',
  styleUrl: './farmstock.component.css'
})
export class FarmstockComponent {
  data:any[] = [];
   constructor(private http: HttpClient) {}
   
   ngOnInit(): void {
    this.getFarmStockData();
  }

   getFarmStockData(){
    this.http.get<any>("https://ksaapi.onrender.com/api/FarmStock").subscribe({
      next: (response) => {
        this.data = response;
        console.log(this.data);
      },
      error: (error) => {
        console.error('Error fetching farmstock data', error);
      },
    });

   }
}
