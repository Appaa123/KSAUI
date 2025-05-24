import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SpinnerService } from '../../services/auth/spinner.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports : [NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  displayedColumns: string[] = ['name', 'quantity'];
  stockData: {name: string, quantity: number}[] = [];
  isOffcanvasOpen: boolean = false;
  token: any = "";

  constructor(private http: HttpClient, 
    private router:Router, 
    private cdRef: ChangeDetectorRef, 
    @Inject(PLATFORM_ID) private platformId: Object,
   private spinnerService: SpinnerService,
   private spinner: NgxSpinnerService,
  private authService: AuthService) {}

  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) {
      this.token = sessionStorage.getItem('jwt');
    } 
    this.authService.verifyToken(this.token).forEach(response => {
      if (!response.valid) {
        console.log("Token validation failed!!");
        this.router.navigate(['/auth']);
      } else {
        console.log("Token validation successful!!");
      }
    }).catch(error => {
      alert('Token verification failed');
      this.router.navigate(['/auth']);
      console.error(error);
    });
  }

  loadSpinner(){
    this.spinner = this.spinnerService.loadSpinner();
  }
  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }
}
