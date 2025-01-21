import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../users/manage-customers/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/user'; // API URL

  constructor(private http: HttpClient) {}

  // Get all customers
  getAllCustomers(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<any[]>(`${this.apiUrl}/users`, { headers })
      .pipe(catchError(this.handleError));
  }


  getCustomerById(customerId: number): Observable<Customer> {
    const headers = this.getAuthHeaders();
    return this.http.get<Customer>(`${this.apiUrl}/get/${customerId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateCustomer(customer: any): Observable<any> {
    const headers = this.getAuthHeaders();  // Include headers with authorization token
    return this.http.put(`${this.apiUrl}/update`, customer, { headers })
      .pipe(catchError(this.handleError));
  }
  
  deleteCustomer(customerId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/delete/${customerId}`, {
      headers,
      responseType: 'text', 
    }).pipe(
      catchError(this.handleError)
    );
  }



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
}
