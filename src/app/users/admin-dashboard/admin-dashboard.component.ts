import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent{
  sidebarVisible = true;
  username = 'Rohan Rathod';

  dropdowns = {
    customers: false,
    bills: false,
    payments: false,
  };

  activeView = 'dashboard';

  chartData = {
    labels: ['Paid', 'Failed', 'Pending'],
    datasets: [
      {
        label: 'Payments',
        data: [65, 59, 80],
        backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'],
      },
    ],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  toggleDropdown(section: 'customers' | 'bills' | 'payments') {
    this.dropdowns[section] = !this.dropdowns[section];
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}