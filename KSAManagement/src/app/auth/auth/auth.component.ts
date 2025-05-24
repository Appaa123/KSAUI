import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { User } from '../../Models/User';
import { catchError, Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { SpinnerService } from '../../services/auth/spinner.service';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [RouterModule, CommonModule, FormsModule, NgxSpinnerModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  private token:any;
  private user:any;
  private tokenData:Observable<any> = new Observable<any>();

  formData = {
    Username:'',
    Password:''
  };

  constructor(
    private http:HttpClient,
    private spinnerService: SpinnerService,
    private spinner: NgxSpinnerService, 
    private router:Router, 
    @Inject(PLATFORM_ID) private platformId: Object
  )
  {
  }

   submitData() : Observable<any> {
      const apiURL = "https://ksaapi.onrender.com/api/Auth/login";
      
      this.spinner.show();
      this.tokenData = this.http.post<{token: string}>("https://ksaapi.onrender.com/api/Auth/login",
        this.formData,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
      );
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);
      return this.tokenData;
    }
  
    onSubmit(form: NgForm) {
      if(form.valid){
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
  
  loadSpinner(){
    this.spinner = this.spinnerService.loadSpinner();
  }
}
