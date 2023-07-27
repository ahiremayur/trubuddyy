import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EightTonineComponent } from './eight-tonine.component';

describe('EightTonineComponent', () => {
  let component: EightTonineComponent;
  let fixture: ComponentFixture<EightTonineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EightTonineComponent]
    });
    fixture = TestBed.createComponent(EightTonineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
