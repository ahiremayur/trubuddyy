import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenTotwelthComponent } from './ten-totwelth.component';

describe('TenTotwelthComponent', () => {
  let component: TenTotwelthComponent;
  let fixture: ComponentFixture<TenTotwelthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenTotwelthComponent]
    });
    fixture = TestBed.createComponent(TenTotwelthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
