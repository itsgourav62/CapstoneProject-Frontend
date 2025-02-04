import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import Router
import { Bill } from '../bill.model';
import { BillManagementService } from 'src/app/services/bill_management.service';

@Component({
  selector: 'app-manage-bills',
  templateUrl: './manage-bills.component.html',
  styleUrls: ['./manage-bills.component.css']
})
export class ManageBillsComponent implements OnInit {
  bills: Bill[] = []; // Use the Bill model for typing

  // Inject Router in the constructor
  constructor(
    private http: HttpClient,
    private billService: BillManagementService,
    private router: Router  // Inject Router
  ) {}

  ngOnInit(): void {
    this.fetchBills();  // Fetch bills when the component initializes
  }

  fetchBills(): void {
    this.billService.fetchAllBills().subscribe({
      next: (data) => {
        // Map the response data to the Bill model
        this.bills = data.map(
          (bill) =>
            new Bill(
              bill.billId,
              bill.amount,
              bill.billType,
              bill.billStatus,
              bill.description,
              bill.due_date,
              bill.created_at,
              bill.user
            )
        );
        console.log('Fetched bills:', this.bills); // Optional for debugging
      },
      error: (error) => {
        console.error('Error fetching bills:', error);
      },
      complete: () => {
        console.log('Fetching bills completed.'); // Optional: log when completed
      },
    });
  }

  // Back Button Functionality
  goBack(): void {
    this.router.navigate(['/admin-dashboard']); // Navigate back to the admin dashboard
  }
}
