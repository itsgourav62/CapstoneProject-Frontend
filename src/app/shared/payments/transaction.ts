interface Transaction {
    billId: string;
    amount: number;
    status: 'Paid' | 'Pending';
    paymentDate: string | null;
  }