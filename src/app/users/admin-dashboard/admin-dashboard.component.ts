import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent{
  constructor(private router: Router) {}

  logout() {
    localStorage.clear(); // Clear session data
    this.router.navigate(['/login']); // Navigate to the login page
  }
}