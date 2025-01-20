import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillConstants } from '../shared/bills/constants/bill-constants';

@Injectable({
  providedIn: 'root',
})
export class BillsService {
    constructor(private http: HttpClient) {}

    getUserBills(userId: string): Observable<any[]> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      });
      const url = `${BillConstants.GetUserBills}/${userId}`;
      return this.http.get<any[]>(url, { headers });
    }
}
