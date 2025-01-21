export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export class Bill {
    billId: number;
    amount: number;
    billType: string;
    billStatus: string;
    description: string;
    due_date: string;
    created_at: string;
    user: User;
  
    constructor(
      billId: number,
      amount: number,
      billType: string,
      billStatus: string,
      description: string,
      due_date: string,
      created_at: string,
      user: User
    ) {
      this.billId = billId;
      this.amount = amount;
      this.billType = billType;
      this.billStatus = billStatus;
      this.description = description;
      this.due_date = due_date;
      this.created_at = created_at;
      this.user = user;
    }
  }
  