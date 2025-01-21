import { Component, OnInit } from '@angular/core';
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


  constructor(private paymentService: PaymentService) {}

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


  // Fetch all payments
  fetchPayments(): void {
    this.paymentService.fetchAllPayments().subscribe({
      next: (data) => (this.payments = data),
      error: (error) => (this.errorMessage = error.message),
    });
  }

  // Search payments by user ID
  searchByUserId(): void {
    const userId = this.searchCriteria.userId; // Ensure valid user ID
    if (userId > 0) {
      this.paymentService.searchPaymentsByUserId(userId).subscribe({
        next: (data) => {
          this.payments = Array.isArray(data) ? data : [];
          console.log('Payments:', this.payments); // Optional for debugging
        },
        error: (error) => {
          this.errorMessage = `Error fetching payments: ${error.message}`;
          console.error(error);
        },
      });
    } else {
      this.errorMessage = 'Invalid User ID';
    }
  }
  
  

  // Search payments by status
  searchByStatus(): void {
    if (this.searchCriteria.status) {
      this.paymentService.searchPaymentsByStatus(this.searchCriteria.status).subscribe({
        next: (data) => (this.payments = data),
        error: (error) => (this.errorMessage = error.message),
      });
    }
  }

  // Update a payment
  updatePayment(payment: Payment): void {
    this.paymentService.updatePayment(payment).subscribe({
      next: (updatedPayment) => {
        const index = this.payments.findIndex((p) => p.pmtId === updatedPayment.pmtId);
        if (index > -1) {
          this.payments[index] = updatedPayment;  // Update the payment in the list
        }
      },
      error: (error) => {
        console.error('Error updating payment:', error);  // Handle error appropriately
        this.errorMessage = error.message;
      },
    });
}


  // Delete a payment
  deletePayment(pmtId: number): void {
    this.paymentService.deletePayment(pmtId).subscribe({
      next: () => {
        this.payments = this.payments.filter((p) => p.pmtId !== pmtId);
      },
      error: (error) => (this.errorMessage = error.message),
    });
  }
}
