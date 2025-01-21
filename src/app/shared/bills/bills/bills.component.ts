import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { BillsService } from 'src/app/services/bills.service';
import { BillConstants } from '../constants/bill-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
})
export class BillsComponent implements OnInit {
  bills: any[] = [];
  id: string = '';

  constructor(private authService: AuthService, 
    private billsService: BillsService,private route:Router,
  private http:HttpClient) {}

  ngOnInit(): void {
    // Fetch userId from localStorage
    if (this.authService.isLoggedIn()) {
      this.id = localStorage.getItem('id') || ''; // Ensures userId is always a string
      // this.fetchBills();
    } else {
      console.error('User not logged in!');
    }
  }

  /**
   * Fetch bills for the logged-in user
   */
  // fetchBills(): void {
  //   const token = this.authService.getToken();
  //   const url = `${BillConstants.GetUserBills}/${this.id}`;
  //   console.log('Token:', token);
  //   console.log('URL:', url);
  
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json',
  //   });
  
  //   this.http.get(url, { headers }).subscribe({
  //     next: (data) => {
  //       console.log('Bills:', data);
  //     },
  //     error: (error) => {
  //       console.error('Error:', error);
  //       if (error.status === 401) {
  //         console.error('Unauthorized. Redirecting to login...');
  //         this.authService.logout();
  //         this.route.navigate(['/login']);
  //       }
  //     },
  //   });
  // }

  goToHome(): void {
   this.route.navigate([''])
  }
}
