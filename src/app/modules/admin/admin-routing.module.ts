import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Mycomponents/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './Mycomponents/home/home.component';
import { MentorsComponent } from './Mycomponents/mentors/mentors.component';
import { EightTonineComponent } from './Mycomponents/eight-tonine/eight-tonine.component';
import { TenTotwelthComponent } from './Mycomponents/ten-totwelth/ten-totwelth.component';
import { GraduatesComponent } from './Mycomponents/graduates/graduates.component';
import { ProfessionalComponent } from './Mycomponents/professional/professional.component';
import { ParentComponent } from './Mycomponents/parent/parent.component';
import { HowItWorksComponent } from './Mycomponents/how-it-works/how-it-works.component';
import { MentorInfoComponent } from './Mycomponents/mentor-info/mentor-info.component';
import { ContactComponent } from './Mycomponents/contact/contact.component';
import { AboutComponent } from './Mycomponents/about/about.component';
import { FaqComponent } from './Mycomponents/faq/faq.component';
import { BookingSessionComponent } from './Mycomponents/booking-session/booking-session.component';
import { MenteeDashboardComponent } from './Mycomponents/mentee-dashboard/mentee-dashboard.component';
import { MentorDashboardComponent } from './Mycomponents/mentor-dashboard/mentor-dashboard.component';
import { MyProfileComponent } from './Mycomponents/my-profile/my-profile.component';
import { JobEducationFormComponent } from './Mycomponents/job-education-form/job-education-form.component';
import { PersonalInfoFormComponent } from './Mycomponents/personal-info-form/personal-info-form.component';
import { TestingComponent } from './Mycomponents/testing/testing.component';
import { CheckboxComponent } from './Mycomponents/checkbox/checkbox.component';
import { BecomeMentorComponent } from './Mycomponents/become-mentor/become-mentor.component';

const routes: Routes = [
  {
    path: '',component:AdminDashboardComponent, children:[
      {path:'tru/home', component: HomeComponent},
      {path:'tru/mentors', component:MentorsComponent},
      {path:'tru/eightTOnine', component: EightTonineComponent},
      {path:'tru/tenTOtwelth', component: TenTotwelthComponent},
      {path:'tru/graduates', component: GraduatesComponent},
      {path:'tru/professional', component: ProfessionalComponent},
      {path:'tru/parent', component: ParentComponent},
      {path:'tru/HowItWorks', component: HowItWorksComponent},
      {path:'tru/person/:id', component: MentorInfoComponent},
      {path:'tru/Contact', component: ContactComponent},
      {path:'tru/About', component: AboutComponent},
      {path:'tru/FAQ', component: FaqComponent},
      {path: 'tru/book/:id', component: BookingSessionComponent},
      {path: 'tru/mentee_dashboard', component: MenteeDashboardComponent},
      {path: 'tru/mentor_dashboard', component: MentorDashboardComponent},
      {path: 'tru/my-profile', component:MyProfileComponent},
      {path: 'tru/job_education_form', component:JobEducationFormComponent},
      {path: 'tru/personal_info_form', component:PersonalInfoFormComponent},
      {path: 'tru/testing', component:TestingComponent},
      {path: 'tru/checkbox', component:CheckboxComponent},
      {path: 'tru/become_mentor', component:BecomeMentorComponent},


      {path:'', redirectTo: '/tru/home', pathMatch:'full'},

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
