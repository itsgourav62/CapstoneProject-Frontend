import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-bills',
  templateUrl: './manage-bills.component.html',
  styleUrls: ['./manage-bills.component.css']
})
export class ManageBillsComponent {

  bills = [
    { id: 1, billNumber: 'B001', customerName: 'John Doe', amount: 100, dueDate: '2025-01-25' },
    { id: 2, billNumber: 'B002', customerName: 'Jane Smith', amount: 200, dueDate: '2025-01-30' },
  ];

  addBill() {
    alert('Add Bill clicked!');
  }

  viewBill(bill: any) {
    alert(`View Bill: ${bill.billNumber}, Amount: $${bill.amount}`);
  }

  editBill(bill: any) {
    alert(`Edit Bill: ${bill.billNumber}`);
  }

  deleteBill(id: number) {
    this.bills = this.bills.filter(b => b.id !== id);
  }

}
