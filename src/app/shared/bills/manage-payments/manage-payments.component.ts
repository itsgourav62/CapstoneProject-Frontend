import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-payments',
  templateUrl: './manage-payments.component.html',
  styleUrls: ['./manage-payments.component.css']
})
export class ManagePaymentsComponent {
  payments = [
    { id: 1, paymentId: 'P001', customerName: 'John Doe', amount: 100, date: '2025-01-15' },
    { id: 2, paymentId: 'P002', customerName: 'Jane Smith', amount: 150, date: '2025-01-18' },
  ];

  addPayment() {
    alert('Add Payment clicked!');
  }

  viewPayment(payment: any) {
    alert(`View Payment: ${payment.paymentId}, Amount: $${payment.amount}`);
  }

  editPayment(payment: any) {
    alert(`Edit Payment: ${payment.paymentId}`);
  }

  deletePayment(id: number) {
    this.payments = this.payments.filter(p => p.id !== id);
  }
}
