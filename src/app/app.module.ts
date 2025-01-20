import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './users/home/home.component';
import { SigninComponent } from './users/signin/signin.component';
import { SignupComponent } from './users/signup/signup.component';
import { ForgotPasswordComponent } from './users/forgotpassword/forgotpassword.component';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './users/admin-dashboard/admin-dashboard.component';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
// PrimeNG Modules
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { BillsComponent } from './shared/bills/bills/bills.component';
import { PaymentComponent } from './shared/payments/payment/payment.component';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    FooterComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    BillsComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    DropdownModule,
    ChartModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    CardModule
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
