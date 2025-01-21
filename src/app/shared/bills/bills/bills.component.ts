import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { BillsService } from 'src/app/services/bills.service';
import { BillConstants } from '../constants/bill-constants';
import { Router } from '@angular/router';
import { BillManagementService } from 'src/app/services/bill_management.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
})
export class BillsComponent implements OnInit {
  bills: any[] = []; // Stores hardcoded bill data
  currentBills: any[] = []; // Stores paginated bills for display
  pageSize: number = 10; // Number of records per page
  errorMessage: string = ''; // Stores error messages
  constructor(private http: HttpClient,private billService:BillManagementService,private route:Router) {}

  ngOnInit(): void {
    
    this.fetchBills();
  }

  fetchBills(): void {
    this.bills = [
      {
        billId: 1,
        amount: 1000,
        billStatus: 'PARTIALLY PAID',
        billType: 'wifi',
        created_at: '2025-01-20 01:45:03.371744',
        description: 'wifi',
        due_date: '2025-01-19 20:13:38.447000',
      },
      {
        billId: 2,
        amount: 1000,
        billStatus: 'PAID',
        billType: 'wifi',
        created_at: '2025-01-20 12:01:53.007778',
        description: 'wifi',
        due_date: '2025-01-19 20:13:38.447000',
      },
      {
        billId: 52,
        amount: 1200,
        billStatus: 'PENDING',
        billType: 'electricity',
        created_at: '2025-01-21 01:08:16.029861',
        description: 'Electricity Bill',
        due_date: '2025-01-20 19:37:24.712000',
      },
      {
        billId: 102,
        amount: 1200,
        billStatus: 'PENDING',
        billType: 'electricity',
        created_at: '2025-01-21 02:35:04.972017',
        description: 'Electricity Bill',
        due_date: '2025-01-20 19:37:24.712000',
      },
      // Add more hardcoded bills as needed
    ];
    this.currentBills = this.bills.slice(0, this.pageSize); // Default to first page
  }

  /**
   * Handle pagination changes
   * @param event Pagination event object
   */
  onPageChange(event: any): void {
    const startIndex = event.first;
    const endIndex = startIndex + event.rows;
    this.currentBills = this.bills.slice(startIndex, endIndex);
  }

  /**
   * Simulate the "Pay Now" action
   * @param billId The ID of the bill to be paid
   */
  payNow(billId: number): void {
    console.log(`Paying bill with ID: ${billId}`);
    this.route.navigate(['payment']);
    // Add your payment processing logic here, like redirecting to the payment page
  }

  goToHome(): void {
   this.route.navigate([''])
  }
}
