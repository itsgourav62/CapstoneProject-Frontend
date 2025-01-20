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

  onSubmit(): void {
    if (this.signinForm.valid) {
      const credentials = this.signinForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
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
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
              this.router.navigate(['/admin-dashboard']);
            } else {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
              this.router.navigate(['/dashboard']);
            }
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password' });
        }
      });
    } else {
      // Show error toast for invalid form
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill out the form correctly' });
    }
  }
}
