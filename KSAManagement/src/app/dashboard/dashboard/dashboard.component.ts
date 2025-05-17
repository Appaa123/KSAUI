import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router:Router, private cdRef: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(){
    if (isPlatformBrowser(this.platformId)) {
      this.token = sessionStorage.getItem('jwt');
    } 
    if(this.token == undefined || this.token == null || this.token == ""){
      this.router.navigate(['/auth']);
    }
  }

  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }
}
