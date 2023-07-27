import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule }   from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { ContactComponent } from './Mycomponents/contact/contact.component';
import { AboutComponent } from './Mycomponents/about/about.component';
import { AdminDashboardComponent } from './Mycomponents/admin-dashboard/admin-dashboard.component';
import { BookingSessionComponent } from './Mycomponents/booking-session/booking-session.component';
import { EightTonineComponent } from './Mycomponents/eight-tonine/eight-tonine.component';
import { FaqComponent } from './Mycomponents/faq/faq.component';
import { FooterComponent } from './Mycomponents/footer/footer.component';
import { GraduatesComponent } from './Mycomponents/graduates/graduates.component';
import { HeaderComponent } from './Mycomponents/header/header.component';
import { HomeComponent } from './Mycomponents/home/home.component';
import { HowItWorksComponent } from './Mycomponents/how-it-works/how-it-works.component';
import { MenteeDashboardComponent } from './Mycomponents/mentee-dashboard/mentee-dashboard.component';
import { MentorDashboardComponent } from './Mycomponents/mentor-dashboard/mentor-dashboard.component';
import { MentorInfoComponent } from './Mycomponents/mentor-info/mentor-info.component';
import { MentorsComponent } from './Mycomponents/mentors/mentors.component';
import { ParentComponent } from './Mycomponents/parent/parent.component';
import { ProfessionalComponent } from './Mycomponents/professional/professional.component';
import { TenTotwelthComponent } from './Mycomponents/ten-totwelth/ten-totwelth.component';
import { CheckboxComponent } from './Mycomponents/checkbox/checkbox.component';
import { MyProfileComponent } from './Mycomponents/my-profile/my-profile.component';
import { JobEducationFormComponent } from './Mycomponents/job-education-form/job-education-form.component';
import { PersonalInfoFormComponent } from './Mycomponents/personal-info-form/personal-info-form.component';
import { TestingComponent } from './Mycomponents/testing/testing.component';
import { BecomeMentorComponent } from './Mycomponents/become-mentor/become-mentor.component';


@NgModule({
  declarations: [
    ContactComponent,
    AboutComponent,
    AdminDashboardComponent,
    BookingSessionComponent,
    EightTonineComponent,
    FaqComponent,
    FooterComponent,
    GraduatesComponent,
    HeaderComponent,
    HomeComponent,
    HowItWorksComponent,
    MenteeDashboardComponent,
    MentorDashboardComponent,
    MentorInfoComponent,
    MentorsComponent,
    ParentComponent,
    ProfessionalComponent,
    TenTotwelthComponent,
    CheckboxComponent,
    MyProfileComponent,
    JobEducationFormComponent,
    PersonalInfoFormComponent,
    TestingComponent,
    BecomeMentorComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
