import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})
export class ManageCustomersComponent {
  customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  addCustomer() {
    alert('Add Customer clicked!');
  }

  viewCustomer(customer: any) {
    alert(`View Customer: ${customer.name}`);
  }

  editCustomer(customer: any) {
    alert(`Edit Customer: ${customer.name}`);
  }

  deleteCustomer(id: number) {
    this.customers = this.customers.filter(c => c.id !== id);
  }
}
