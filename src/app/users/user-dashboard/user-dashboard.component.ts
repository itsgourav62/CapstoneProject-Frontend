import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  // Dummy data for bills
  bills = [
    {
      name: 'Electricity',
      description: 'Pay your electricity bill quickly.',
      image: 'assets/images/electricity-bill-icon.png',
      link: '/pay/electricity',
    },
    {
      name: 'Water',
      description: 'Clear your water dues.',
      image: 'assets/images/water-icon.png',
      link: '/pay/water',
    },
    {
      name: 'Gas',
      description: 'Pay your gas bill securely.',
      image: 'assets/images/gas-icon.png',
      link: '/pay/gas',
    },
    {
      name: 'Broadband',
      description: 'Ensure uninterrupted service.',
      image: 'assets/images/broadband-icon.png',
      link: '/pay/broadband',
    },
    {
      name: 'Mobile Recharge',
      description: 'Top up your phone balance.',
      image: 'assets/images/mobile-recharge-icon.png',
      link: '/pay/mobile',
    },
    {
      name: 'Credit Cards',
      description: 'Manage your credit payments.',
      image: 'assets/images/credit-card-icon.png',
      link: '/pay/credit-card',
    },
  ];

 
  dueAmount = 0;
  dueDate = new Date(2025, 10, 20); // Example due date (20th Jan 2025)
  recentActivities = [
    'Electricity bill paid on 15th Jan',
    'Mobile recharge on 12th Jan',
    'Gas bill paid on 10th Jan',
    'Broadband bill scheduled for 18th Jan',
  ];

  constructor(private router: Router) {}

  // Logout function
  logout() {
    // Implement actual logout logic here (e.g., clear tokens)
    alert('Logged out successfully!');
    this.router.navigate(['/']);
  }
}