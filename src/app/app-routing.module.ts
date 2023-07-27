import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { SuccessComponent } from './components/payment/success/success.component';
import { CancelComponent } from './components/payment/cancel/cancel.component';
const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'payment/success/', component: SuccessComponent},
  {path: 'payment/cancel', component: CancelComponent},
  {path: 'tru', loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
