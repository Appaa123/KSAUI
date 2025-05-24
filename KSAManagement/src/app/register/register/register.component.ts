import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SpinnerService } from '../../services/auth/spinner.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { catchError, Observable, tap } from 'rxjs';
import { User } from '../../Models/User';
import { error } from 'console';
import { AuthComponent } from '../../auth/auth/auth.component';

@Component({
  selector: 'app-register',
  imports: [   
     CommonModule,
    RouterModule,
    CommonModule,
    FormsModule,
    NgxSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private token:any;
  private tokenData:any;
  private data:any;
  noMatch:boolean = false;
  private user:User = new User();
  formData = {
    Username:'',
    Password:'',
    Re_enter_password:''
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

  getTokenData() : Observable<any> {

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


  submitData() : Observable<any> {

    const apiURL = "https://ksaapi.onrender.com/api/User/add-user";

    if(this.formData.Password == this.formData.Re_enter_password){
      this.user.Username = this.formData.Username;
      this.user.Password = this.formData.Password; 
    }
    else{
      this.noMatch = true;
    }

    // this.getTokenData()
    //       .subscribe({
    //         next: (response) => {
    //           this.token = response.token; // ✅ Assign token here
    //           console.log("Token received:", this.token);
    //           alert("Form Submitted successfully");          
    //           if (isPlatformBrowser(this.platformId)) {
    //           // Optional: store in sessionStorage for future authenticated requests
    //           sessionStorage.setItem('jwt', this.token);
    //           sessionStorage.setItem('user', this.formData.Username);
    //           }
    //        this.spinner.show();
    // //calling API to register user
    //       this.data = this.http.post(apiURL, this.user, 
    //           {
    //             headers: { 
    //               'Authorization': `Bearer ${this.token}`,
    //               'Content-Type': 'application/json' 
    //             }}).pipe(
    //           tap(response => console.log("Success!", response)),
    //           catchError(error => {
    //             console.error('Error:', error);
    //             throw error;
    //           })
    //         );
    //       },
    //   error: (error) => {
    //     console.error('Login error:', error);
    //   }
    //   });

    this.data = this.http.post(apiURL, this.user, 
      {
        headers: { 
          'Content-Type': 'application/json' 
        }}).pipe(
      tap(response => console.log("Success!", response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      })
    );
      return this.data;
  } 

  onSubmit(form: NgForm) {
    if(form.valid && !this.noMatch){
      this.submitData()
      .subscribe({
        next: (response) => {
          if (isPlatformBrowser(this.platformId)) {
          // Optional: store in sessionStorage for future authenticated requests
          sessionStorage.clear();
          this.router.navigate(['/auth']);
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
