import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeDashboardComponent } from './mentee-dashboard.component';

describe('MenteeDashboardComponent', () => {
  let component: MenteeDashboardComponent;
  let fixture: ComponentFixture<MenteeDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenteeDashboardComponent]
    });
    fixture = TestBed.createComponent(MenteeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
