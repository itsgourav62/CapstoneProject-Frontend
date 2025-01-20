import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentConstants } from '../shared/payments/constants/payment-constants';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  /**
   * Processes the payment by posting the payment data to the API.
   * @param paymentData - The data to be posted for processing the payment.
   * @returns An observable for the API response.
   */
//   processPayment(paymentData: {
//     pmtId: number;
//     amount: number;
//     paymentStatus: string;
//     paymentDate: string;
//     bill_id: number;
//   }): Observable<any> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http.post(PaymentConstants.PAYMENT_PROCESS_URL, paymentData, {
//       headers: headers,
//     });
//   }

  processPayment(paymentData: any): Observable<any> {
    return this.http.post(PaymentConstants.PAYMENT_PROCESS_URL, paymentData);
  }
}
