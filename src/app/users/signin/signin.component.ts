import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      this.isLoading = true;
      const credentials = this.signinForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Login successful', response);

          // Dynamically capture session details from the API response
          if (response && response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('tokenType', response.tokenType || 'Bearer');
            localStorage.setItem('id', response.id?.toString() || '');
            localStorage.setItem('username', response.username || '');
            localStorage.setItem('email', response.email || '');
            localStorage.setItem('roles', JSON.stringify(response.roles || []));

            // Navigate based on roles
            if (response.roles.includes('ROLE_ADMIN')) {
              this.messageService.add({ 
                severity: 'success', 
                summary: 'Welcome Admin!', 
                detail: 'Login successful. Redirecting to admin dashboard...' 
              });
              setTimeout(() => {
                this.router.navigate(['/admin-dashboard']);
              }, 1500);
            } else {
              this.messageService.add({ 
                severity: 'success', 
                summary: 'Welcome Back!', 
                detail: 'Login successful. Redirecting to dashboard...' 
              });
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 1500);
            }
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login failed', error);
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Login Failed', 
            detail: 'Invalid username or password. Please try again.' 
          });
        }
      });
    } else {
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Form Invalid', 
        detail: 'Please fill out all required fields correctly.' 
      });
    }
  }
}
