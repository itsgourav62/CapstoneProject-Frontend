import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  userName: string = 'User'; // Default username
  isProcessing: boolean = false; // Spinner state for "Pay Now" button
  transactions: Transaction[] = [
    { billId: 'B12345', amount: 1500, status: 'Paid', paymentDate: '2025-01-15' },
    { billId: 'B12346', amount: 800, status: 'Pending', paymentDate: null },
    { billId: 'B12347', amount: 1200, status: 'Paid', paymentDate: '2025-01-10' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Load username from local storage
    const storedUserName = localStorage.getItem('username');
    this.userName = storedUserName ? storedUserName : 'User';
  }

  onPayNow(): void {
    this.router.navigate(['/payment']);
  }

  goToViewBills(): void {
    const userId = localStorage.getItem('id'); // Get user ID from localStorage

    if (userId) {
      this.router.navigate(['/bills'], { queryParams: { userId } }); // Navigate to BillsComponent with userId as a parameter
    } else {
      alert('User not logged in!');
    }
  }

  goToPaymentHistory(): void {
    this.router.navigate(['/payment-history']); // Redirect to Payment History page
  }

  goToAccount(): void {
    this.router.navigate(['/account']); // Redirect to Account Settings
  }

  logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.clear(); // Clear all session data from localStorage
      alert('You have been logged out.');
      this.router.navigate(['/login']); // Redirect to login page
    }
  }

  viewTransaction(transaction: Transaction): void {
    alert(`Viewing transaction details:\nBill ID: ${transaction.billId}\nAmount: ${transaction.amount}\nStatus: ${transaction.status}\nPayment Date: ${transaction.paymentDate || 'N/A'}`);
  }
}

// Define Transaction interface for type safety
interface Transaction {
  billId: string;
  amount: number;
  status: 'Paid' | 'Pending';
  paymentDate: string | null;
}
