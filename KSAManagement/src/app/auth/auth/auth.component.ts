import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { User } from '../../Models/User';
import { catchError, Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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

  constructor(private http:HttpClient, private router:Router, @Inject(PLATFORM_ID) private platformId: Object){
  }

   submitData() : Observable<any> {
      const apiURL = "https://ksaapi.onrender.com/api/Auth/login";

      return this.http.post<{token: string}>("http://localhost:5001/api/Auth/login",
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
      
          if (isPlatformBrowser(this.platformId)) {
          // Optional: store in sessionStorage for future authenticated requests
          sessionStorage.setItem('jwt', this.token);
          sessionStorage.setItem('user', this.formData.Username);
          }
        },
        error: (error) => {
          console.error('Login error:', error);
        }
      });
    } 
}
