import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import Router
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from './payment.model';

@Component({
  selector: 'app-manage-payments',
  templateUrl: './manage-payments.component.html',
  styleUrls: ['./manage-payments.component.css']
})
export class ManagePaymentsComponent implements OnInit {
  payments: Payment[] = [];
  searchCriteria = { userId: 0, status: '' };
  errorMessage = '';
  selectedPayment: Payment = { pmtId: 0, amount: 0, paymentStatus: '', paymentDate: '', bill_id: 0 };
  isModalVisible: boolean = false;

  constructor(private paymentService: PaymentService, private router: Router) {}  // Inject Router

  ngOnInit(): void {
    this.fetchPayments();
  }

  openUpdateModal(payment: Payment): void {
    this.selectedPayment = { ...payment }; // Clone the payment to the selectedPayment
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedPayment = { pmtId: 0, amount: 0, paymentStatus: '', paymentDate: '', bill_id: 0 }; // Reset the form
  }

  onSubmit(form: any): void {
    if (form.valid) {
      this.paymentService.updatePayment(this.selectedPayment).subscribe({
        next: (updatedPayment) => {
          const index = this.payments.findIndex((p) => p.pmtId === updatedPayment.pmtId);
          if (index > -1) this.payments[index] = updatedPayment;
          this.closeModal(); // Close the modal after success
        },
        error: (error) => (this.errorMessage = error.message),
      });
    }
  }

  fetchPayments(): void {
    this.paymentService.fetchAllPayments().subscribe({
      next: (data) => (this.payments = data),
      error: (error) => (this.errorMessage = error.message),
    });
  }

  searchByUserId(): void {
    const userId = this.searchCriteria.userId;
    if (userId > 0) {
      this.paymentService.searchPaymentsByUserId(userId).subscribe({
        next: (data) => {
          this.payments = Array.isArray(data) ? data : [];
        },
        error: (error) => {
          this.errorMessage = `Error fetching payments: ${error.message}`;
        },
      });
    } else {
      this.errorMessage = 'Please enter a valid User ID';
    }
  }

  searchByStatus(): void {
    const status = this.searchCriteria.status;
    if (status.trim()) {
      this.paymentService.searchPaymentsByStatus(status).subscribe({
        next: (data) => {
          this.payments = data;
        },
        error: (error) => {
          this.errorMessage = `Error fetching payments by status: ${error.message}`;
        },
      });
    } else {
      this.errorMessage = 'Please enter a valid status';
    }
  }

  clearSearch(fieldName: string): void {
    if (fieldName === 'userId') {
      this.searchCriteria.userId = 0;  // Reset userId field
    } else if (fieldName === 'status') {
      this.searchCriteria.status = '';  // Reset status field
    }
  }

  deletePayment(pmtId: number): void {
    this.paymentService.deletePayment(pmtId).subscribe({
      next: () => {
        this.payments = this.payments.filter((p) => p.pmtId !== pmtId);
      },
      error: (error) => (this.errorMessage = error.message),
    });
  }

  // Back Button Functionality
  goBack(): void {
    this.router.navigate(['/admin-dashboard']); // Navigate back to the dashboard list route
  }
}
