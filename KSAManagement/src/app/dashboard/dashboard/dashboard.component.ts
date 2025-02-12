import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  displayedColumns: string[] = ['name', 'quantity'];
  stockData: {name: string, quantity: number}[] = [];
  isOffcanvasOpen: boolean = false;
  ngOnInit(){
    this.stockData = [
      { name: 'Corn', quantity: 100 },
      { name: 'Wheat', quantity: 50 },
      { name: 'Cattle Feed', quantity: 20 }
      // more stock items
    ];
  }

  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }
}
