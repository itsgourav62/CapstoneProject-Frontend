import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './users/home/home.component';
import { SigninComponent } from './users/signin/signin.component';
import { SignupComponent } from './users/signup/signup.component';
import { ForgotPasswordComponent } from './users/forgotpassword/forgotpassword.component';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component'; // Import the User Dashboard component
import { AdminDashboardComponent } from './users/admin-dashboard/admin-dashboard.component';
import { authGuard } from './security/auth.guard';
import { adminGuardGuard } from './security/admin-guard.guard';
import { BillsComponent } from './shared/bills/bills/bills.component';
import { PaymentComponent } from './shared/payments/payment/payment.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Home Page
  { path: 'signin', component: SigninComponent }, // Sign-In Page
  { path: 'signup', component: SignupComponent }, // Sign-Up Page
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'dashboard', component: UserDashboardComponent ,canActivate: [authGuard] },  // Route for Dashboard page
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminGuardGuard] }, // User Dashboard
  { path: 'bills', component: BillsComponent },
  { path: 'payment',component:PaymentComponent},
  { path: '**', redirectTo: '' } // Redirect invalid routes to Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
