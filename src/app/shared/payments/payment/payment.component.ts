import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentData = {
    pmtId: 0,
    amount: null,
    paymentStatus: null,
    paymentDate: new Date().toISOString(),
    bill_id: null,
  };

  paymentStatusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Paid', value: 'Paid' },
    { label: 'Failed', value: 'Failed' },
  ];

  isProcessing: boolean = false;

  constructor(
    private paymentService: PaymentService,
    private messageService: MessageService,
    private router:Router
  ) {}

  onSubmitPayment() {
    if (this.isProcessing) return;

    this.isProcessing = true;

    this.paymentService.processPayment(this.paymentData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Payment Successful',
          detail: 'Your payment has been processed successfully.',
        });
        this.resetForm();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Payment could not be processed. Please try again.';
        this.messageService.add({
          severity: 'error',
          summary: 'Payment Failed',
          detail: errorMessage,
        });
        this.isProcessing = false;
      },
    });
  }

  resetForm() {
    this.paymentData = {
      pmtId: 0,
      amount: null,
      paymentStatus: null,
      paymentDate: new Date().toISOString(),
      bill_id: null,
    };
    this.isProcessing = false;
  }
}
