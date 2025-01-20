import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BillsService } from 'src/app/services/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
})
export class BillsComponent implements OnInit {
  bills: any[] = [];
  id: string = '';

  constructor(private authService: AuthService, private billsService: BillsService,private route:Router) {}

  ngOnInit(): void {
    // Fetch userId from localStorage
    if (this.authService.isLoggedIn()) {
      this.id = localStorage.getItem('id') || ''; // Ensures userId is always a string
      this.fetchBills();
    } else {
      console.error('User not logged in!');
    }
  }

  /**
   * Fetch bills for the logged-in user
   */
  fetchBills(): void {
    this.billsService.getUserBills(this.id).subscribe({
      next: (data) => {
        this.bills = data;
        console.log('Bills fetched successfully:', data);
      },
      error: (error) => {
        console.error('Error fetching bills:', error);
      },
    });
  }

  goToHome(): void {
   this.route.navigate([''])
  }
}
