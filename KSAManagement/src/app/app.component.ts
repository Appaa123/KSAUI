import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KSAManagement';

  constructor(private router: Router) {}

  // This will return true if the current route is dashboard
  isDashboardRoute(): boolean {
    return this.router.url.includes('dashboard');
  }
}
