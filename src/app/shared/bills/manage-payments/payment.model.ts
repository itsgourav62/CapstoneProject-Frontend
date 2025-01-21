export class Payment {
    constructor(
      public pmtId: number,
      public amount: number,
      public paymentStatus: string,
      public paymentDate: string,
      public bill_id: number
    ) {}
  }