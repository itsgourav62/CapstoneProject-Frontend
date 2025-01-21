import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { PaymentConstants } from '../shared/payments/constants/payment-constants';
import { Payment } from '../shared/bills/manage-payments/payment.model';
import { map } from 'rxjs/operators';

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

  processPayment(paymentData: any): Observable<any> {
    return this.http.post(PaymentConstants.PAYMENT_PROCESS_URL, paymentData);
  }




  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Fetch all payments
  fetchAllPayments(): Observable<Payment[]> {
    return this.http
      .get<Payment[]>(PaymentConstants.PAYMENT_RETRIEVAL_URL, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Search payments by user ID or status
  searchPaymentsByUserId(userId: number): Observable<Payment[]> {
  const url = `${PaymentConstants.BASE_URL}/payments/retrieveById/${userId}`;
  return this.http
    .get<Payment[]>(url, { headers: this.getAuthHeaders() })
    .pipe(
      map((response: any) => {
        // Handle cases where the response might not be an array
        return Array.isArray(response) ? response : [response];
      }),
      catchError(this.handleError)
    );
}


searchPaymentsByStatus(status: string): Observable<Payment[]> {
  const url = `${PaymentConstants.PAYMENT_RETRIEV_BY_STATUS_URL}${status}`;  // Concatenate the status
  return this.http
    .get<Payment[]>(url, {
      headers: this.getAuthHeaders(),
    })
    .pipe(catchError(this.handleError));
}


  // Update payment
  updatePayment(payment: Payment): Observable<Payment> {
    const url = `${PaymentConstants.PAYMENT_UPDATE_BY_ID_URL}${payment.pmtId}`; 
    return this.http
      .put<Payment>(url, payment, {
        headers: this.getAuthHeaders(), // Ensure this includes the correct authorization token
      })
      .pipe(catchError(this.handleError));
}


  // Delete payment
  deletePayment(pmtId: number): Observable<void> {
    return this.http
      .delete<void>(PaymentConstants.PAYMENT_DELETE_BY_ID_URL, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }


  triggerPayment(userId: string): void {
    this.http.post(`/api/payments/${userId}`, { /* Payment data */ }).subscribe(
      (response) => {
        console.log('Payment triggered successfully');
      },
      (error) => {
        console.error('Error triggering payment', error);
      }
    );
  }

  // Error handler
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }

}
