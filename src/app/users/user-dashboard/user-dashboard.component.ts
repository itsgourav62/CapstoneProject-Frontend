
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/shared/bills/manage-payments/payment.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  userName: string = 'User'; // Default username
  isProcessing: boolean = false; // Spinner state for "Pay Now" button
  transactions: Payment[] = [];
  errorMessage: string = '';

  constructor(private router: Router,private paymentService: PaymentService ) {}

  ngOnInit(): void {
    // Load username from local storage
    const storedUserName = localStorage.getItem('username');
    this.userName = storedUserName ? storedUserName : 'User';

    this.fetchPayments();
  }


 // Fetch all payments
 fetchPayments(): void {
  const userId = localStorage.getItem('id'); // Get the userId from localStorage
  if (userId) {
    this.paymentService.searchPaymentsByUserId(+userId).subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (error) => {
        this.errorMessage = `Error fetching transactions: ${error.message}`;
      },
    });
  } else {
    this.errorMessage = 'User not logged in!';
  }
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

  viewTransaction(transaction: Payment): void {
    alert(`Viewing transaction details:\nBill ID: ${transaction.bill_id}\nAmount: ${transaction.amount}\nStatus: ${transaction.paymentStatus}\nPayment Date: ${transaction.paymentDate}`);
  }
}

// Define Transaction interface for type safety
interface Transaction {
  billId: string;
  amount: number;
  status: 'Paid' | 'Pending';
  paymentDate: string | null;
}
