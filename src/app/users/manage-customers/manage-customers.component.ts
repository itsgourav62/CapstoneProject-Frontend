import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from './customer';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})
export class ManageCustomersComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer = this.defaultCustomer();
  selectedRoleId: number = 1;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (response) => {
        this.customers = response;
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }

  addCustomer(): void {
    alert('Add customer functionality to be implemented.');
  }

  viewCustomerDetails(customer: Customer): void {
    this.selectedCustomer = customer;
    const modalElement = document.getElementById('customerDetailsModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // openEditCustomerModal(customer: Customer): void {
  //   this.selectedCustomer = { ...customer }; // Clone to avoid modifying the original
  //   this.selectedRoleId = this.selectedCustomer.roles[0]?.id || 1; // Set role ID
  //   const modalElement = document.getElementById('editCustomerModal');
  //   if (modalElement) {
  //     const modalInstance = new bootstrap.Modal(modalElement);
  //     modalInstance.show();
  //   }
  // }

  // Set default structure for Customer
  defaultCustomer(): Customer {
    return {
      id: 0,
      username: '',
      email: '',
      // password: '',
      mobile: '',
      address: '',
      gender: '',
      roles: [{ id: 1, name: 'ROLE_USER' }]
    };
  }

  openEditCustomerModal(customer: Customer): void {
    this.selectedCustomer = { ...customer }; // Clone to avoid modifying the original
    this.selectedRoleId = this.selectedCustomer.roles[0]?.id || 1; // Set role ID
    const modalElement = document.getElementById('editCustomerModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  updateRoleName(): void {
    this.selectedCustomer.roles = [
      {
        id: this.selectedRoleId,
        name: this.selectedRoleId === 1 ? 'ROLE_USER' : 'ROLE_ADMIN'
      }
    ];
  }

  updateCustomer(): void {
    if (this.selectedCustomer) {
      this.customerService.updateCustomer(this.selectedCustomer).subscribe({
        next: (updatedCustomer) => {
          const index = this.customers.findIndex((cust) => cust.id === updatedCustomer.id);
          if (index !== -1) {
            this.customers[index] = updatedCustomer;
          }
          alert('Customer updated successfully.');
          const modalElement = document.getElementById('editCustomerModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }
        },
        error: (error) => {
          console.error('Error updating customer:', error);
        }
      });
    }
  }

  deleteCustomer(customerId: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(customerId).subscribe({
        next: (response) => {
          console.log('Delete response:', response);
          this.customers = this.customers.filter(customer => customer.id !== customerId);
          alert('Customer deleted successfully!');
        },
        error: (error) => {
          console.error('Error response:', error);
          alert(`Failed to delete customer. Error: ${error.message || 'Unknown error'}`);
        },
        complete: () => {
          console.log('Delete operation completed.');
        }
      });
    }
  }
  logout(): void {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
