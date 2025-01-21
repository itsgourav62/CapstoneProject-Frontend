import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Bill } from '../shared/bills/bill.model';

@Injectable({
  providedIn: 'root',
})
export class BillManagementService {
    private apiUrl = 'http://localhost:8080/api/bills'; // API URL

  constructor(private http: HttpClient) {}

 
  // Helper method to get authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Error handler
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }


  fetchAllBills(): Observable<Bill[]> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<Bill[]>(`${this.apiUrl}/retrievAll`, { headers })
      .pipe(catchError(this.handleError));
  }

  getAllCustomers(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<any[]>(`${this.apiUrl}/users`, { headers })
      .pipe(catchError(this.handleError));
  }

//   // Fetch bills by userId
//   fetchBillsByUserId(userId: number): Observable<Bill[]> {
//     const url = `${this.apiUrl}/user/${userId}`; // API URL to get bills by userId
//     return this.http.get<Bill[]>(url, { headers: this.getAuthHeaders() }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Edit bill (update bill details)
//   editBill(bill: Bill): Observable<Bill> {
//     const url = `${this.apiUrl}/update/${bill.billId}`; // API URL to update the bill
//     return this.http.put<Bill>(url, bill, { headers: this.getAuthHeaders() }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Delete bill by billId
//   deleteBill(billId: number): Observable<void> {
//     const url = `${this.apiUrl}/delete/${billId}`; // API URL to delete the bill
//     return this.http.delete<void>(url, { headers: this.getAuthHeaders() }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Search bills by status (e.g., 'Paid', 'Unpaid')
//   searchBillsByStatus(status: string): Observable<Bill[]> {
//     const url = `${this.apiUrl}/search?status=${status}`; // API URL for searching bills by status
//     return this.http.get<Bill[]>(url, { headers: this.getAuthHeaders() }).pipe(
//       catchError(this.handleError)
//     );
//   }
}
