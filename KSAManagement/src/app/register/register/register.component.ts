import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SpinnerService } from '../../services/auth/spinner.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [    CommonModule,
    RouterModule,
    CommonModule,
    FormsModule,
    NgxSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

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

  submitData() : Observable<any> {
    return new Observable<any>();
  }

  onSubmit(form: NgForm) {
    if(form.valid){
    this.submitData()
    .subscribe({
      next: (response) => {
        if (isPlatformBrowser(this.platformId)) {
        // Optional: store in sessionStorage for future authenticated requests
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
