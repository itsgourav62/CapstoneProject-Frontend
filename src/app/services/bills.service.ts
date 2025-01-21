import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillConstants } from '../shared/bills/constants/bill-constants';

@Injectable({
  providedIn: 'root',
})
export class BillsService {
    constructor(private http: HttpClient) {}

    getUserBills(userId: string): Observable<any> {
      const token = localStorage.getItem('token'); // Replace with your token key
      const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
      });
  
      return this.http.get(`${BillConstants.GetUserBills}/${userId}`, { headers });
  }


  
}
