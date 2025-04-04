import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { catchError, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-farmstockdetails',
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './farmstockdetails.component.html',
  styleUrl: './farmstockdetails.component.css'
})
export class FarmstockdetailsComponent {

  isOffcanvasOpen: boolean = false;
  data:any[] = [];

  formData = {
    type: '',
    quantity: '',
    date: '',
    days:'',
    summary: ''
  };

  constructor(private http: HttpClient) {}

  submitData() : Observable<any> {
    const apiURL = "https://ksaapi.onrender.com/api/FarmStock";
    
    return this.http.post(apiURL, this.formData, 
      {headers: { 'Content-Type': 'application/json' }}).pipe(
      tap(response => console.log("Success!", response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  onSubmit() {
    this.submitData().subscribe({
      next : () => {
        this.getFarmStockData();
        alert("Form Submitted successfully");
      },
      error : () => alert("Failed to submit form")
    });
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

  
  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }

}
