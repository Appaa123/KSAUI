import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports : [NavbarComponent, NgxSpinnerComponent],
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
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }
  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }
}
