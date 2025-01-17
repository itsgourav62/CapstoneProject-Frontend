import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './users/home/home.component';
import { SigninComponent } from './users/signin/signin.component';
import { SignupComponent } from './users/signup/signup.component';
import { ForgotPasswordComponent } from './users/forgotpassword/forgotpassword.component';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component'; // Import the User Dashboard component

const routes: Routes = [
  { path: '', component: HomeComponent }, // Home Page
  { path: 'signin', component: SigninComponent }, // Sign-In Page
  { path: 'signup', component: SignupComponent }, // Sign-Up Page
  { path: 'forgotpassword', component: ForgotPasswordComponent }, // Forgot Password Page
  { path: 'dashboard', component: UserDashboardComponent }, // User Dashboard
  { path: '**', redirectTo: '' } // Redirect invalid routes to Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
