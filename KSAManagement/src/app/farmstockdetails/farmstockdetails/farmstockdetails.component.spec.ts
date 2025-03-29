import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmstockdetailsComponent } from './farmstockdetails.component';

describe('FarmstockdetailsComponent', () => {
  let component: FarmstockdetailsComponent;
  let fixture: ComponentFixture<FarmstockdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmstockdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmstockdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
