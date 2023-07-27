import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEducationFormComponent } from './job-education-form.component';

describe('JobEducationFormComponent', () => {
  let component: JobEducationFormComponent;
  let fixture: ComponentFixture<JobEducationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobEducationFormComponent]
    });
    fixture = TestBed.createComponent(JobEducationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
