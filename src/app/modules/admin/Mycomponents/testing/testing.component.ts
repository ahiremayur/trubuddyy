import { Component } from '@angular/core';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent {
  workExperiences: any[] = [];

  addWorkExperience() {
    this.workExperiences.push({ company: '', job: '', description: '', duration: '' });
  }

  removeWorkExperience(index: number) {
    this.workExperiences.splice(index, 1);
  }

  submitForm() {
    this.workExperiences.forEach((experience, index) => {
      const company = (<HTMLInputElement>document.getElementById(`company${index}`)).value;
      const job = (<HTMLInputElement>document.getElementById(`job${index}`)).value;
      const description = (<HTMLInputElement>document.getElementById(`description${index}`)).value;
      const duration = (<HTMLInputElement>document.getElementById(`duration${index}`)).value;
  
      this.workExperiences[index] = { company, job, description, duration };
    });
  
    console.log(this.workExperiences);
    // Convert data to pickle format if needed
  }
}
