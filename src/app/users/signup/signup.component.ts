import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  currentStep: number = 1;

  constructor(
    private fb: FormBuilder,
    private signUpService: AuthService,
    private messageService: MessageService
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

  // Navigate to the next or previous step
  goToStep(step: number): void {
    if (step === 2 && (!this.signupForm.get('mobile')?.valid || !this.signupForm.get('address')?.valid || !this.signupForm.get('gender')?.valid)) {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Please complete Step 1 before proceeding.' });
      return;
    }
    this.currentStep = step;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.signupForm.valid) {
      const currentTimestamp = new Date().toISOString();
      const signupData = {
        ...this.signupForm.value,
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
        role: null, // Will be set by the backend
      };

      this.signUpService.signup(signupData).subscribe({
        next: (response) => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Signup Successful!'})
          this.signupForm.reset();
          this.currentStep = 1; // Reset to the first step
        },
        error: (error) => {
          console.error('Signup Error:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Signup failed. Please try again.' });
        },
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Please fill out all required fields correctly. ' });
    }
  }
}
