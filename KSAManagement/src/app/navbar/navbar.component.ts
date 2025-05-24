import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isOffcanvasOpen: boolean = false;
  user: string | null = "";

  constructor(private router:Router){}

  ngOnInit(){
    this.user = sessionStorage.getItem('user');
  }

  logout(){
    this.router.navigate(['/auth']);
    sessionStorage.clear();
  }
  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }

}
