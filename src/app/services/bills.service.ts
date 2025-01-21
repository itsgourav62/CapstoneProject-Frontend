import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BillConstants } from '../shared/bills/constants/bill-constants';

@Injectable({
  providedIn: 'root',
})
export class BillsService {
    constructor(private http: HttpClient) {}
    private apiUrl = 'http://localhost:8080/api/bills/retrievAll';
    getUserBills(userId: string): Observable<any> {
      const token = localStorage.getItem('token'); // Replace with your token key
      const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
      });
  
      return this.http.get(`${BillConstants.GetUserBills}/${userId}`, { headers });
  }


  fetchAllBills(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<any[]>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError));
  }

  // Get Authorization Headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }

  
}
