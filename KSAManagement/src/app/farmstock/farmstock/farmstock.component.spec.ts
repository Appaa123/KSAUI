import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmstockComponent } from './farmstock.component';

describe('FarmstockComponent', () => {
  let component: FarmstockComponent;
  let fixture: ComponentFixture<FarmstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmstockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
