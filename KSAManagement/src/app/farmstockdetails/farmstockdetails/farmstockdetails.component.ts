import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { catchError, Observable, tap } from 'rxjs';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-farmstockdetails',
  imports: [CommonModule, NavbarComponent, FormsModule, RouterModule],
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

  constructor(private http: HttpClient, private router: Router) {}

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
        alert("Details Submitted successfully");
        this.router.navigate(['/farmstock']);
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
