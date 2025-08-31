import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  currentStep: number = 1;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private signUpService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Check if step 1 is valid
   */
  isStep1Valid(): boolean {
    return this.signupForm.get('email')?.valid === true &&
           this.signupForm.get('mobile')?.valid === true &&
           this.signupForm.get('address')?.valid === true &&
           this.signupForm.get('gender')?.valid === true;
  }

  /**
   * Navigate to the next or previous step
   */
  goToStep(step: number): void {
    if (step === 2 && !this.isStep1Valid()) {
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Incomplete Information', 
        detail: 'Please complete all required fields before proceeding.' 
      });
      return;
    }
    this.currentStep = step;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      
      const currentTimestamp = new Date().toISOString();
      const signupData = {
        ...this.signupForm.value,
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
        role: null, // Will be set by the backend
      };

      this.signUpService.signup(signupData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'success', 
            summary: 'Welcome to QwikPay!', 
            detail: 'Your account has been created successfully. Please sign in to continue.'
          });
          
          // Reset form and redirect after a delay
          this.signupForm.reset();
          this.currentStep = 1;
          
          setTimeout(() => {
            this.router.navigate(['/signin']);
          }, 2000);
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Signup Error:', error);
          
          let errorMessage = 'Account creation failed. Please try again.';
          if (error?.error?.message) {
            errorMessage = error.error.message;
          } else if (error?.message) {
            errorMessage = error.message;
          }
          
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Signup Failed', 
            detail: errorMessage 
          });
        },
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
      
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Invalid Form', 
        detail: 'Please fill out all required fields correctly.' 
      });
    }
  }
}
