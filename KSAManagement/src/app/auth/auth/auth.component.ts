import { HttpClient } from '@angular/common/http';
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
      const apiURL = "http://localhost:5001/api/Auth/login";

      return this.http.post<Object>("http://localhost:5001/api/Auth/login",
        this.formData,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      .pipe(
        tap(response => console.log("Success!", response)),
        catchError(error => {
          console.error('Error:', error);
          throw error;
        })
        
      );
    }
  
    onSubmit() {
      this.submitData().subscribe({
        next: () => {
          alert("Form Submitted successfully");
          localStorage.setItem('Username', this.formData.Username);
          try{
           this.router.navigate(['/dashboard']);
          }
          catch (error) {
            console.error('Navigation failed:', error);
          }
        },
        error : () => alert("Failed to login, please check the username or password")
      });
    }
}
