import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../../Models/User';
import { catchError, Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  private token:any;
  private user:any;

  formData = {
    Username:'',
    Password:''
  };

  constructor(private http:HttpClient, private router:Router){
  }

   submitData() : Observable<any> {
      const apiURL = "https://ksaapi.onrender.com/api/Auth/login";

      return this.http.post<{token: string}>("https://ksaapi.onrender.com/api/Auth/login",
        this.formData,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
      );
    }
  
    onSubmit() {
      this.submitData()
      .subscribe({
        next: (response) => {
          this.token = response.token; // ✅ Assign token here
          console.log("Token received:", this.token);
          alert("Form Submitted successfully");
          try{
           this.router.navigate(['/dashboard']);
          }
          catch (error) {
            console.error('Navigation failed:', error);
          }
      
          // Optional: store in sessionStorage for future authenticated requests
          sessionStorage.setItem('jwt', this.token);
          sessionStorage.setItem('user', this.formData.Username);
        },
        error: (error) => {
          console.error('Login error:', error);
        }
      });
    }
}
