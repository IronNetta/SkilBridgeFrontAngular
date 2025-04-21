import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {DashboardData} from '../models/dashboard.model';


@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly _http = inject(HttpClient);

  getDashboard(): Observable<DashboardData> {
    const token = localStorage.getItem('token');
    console.log('TOKEN:', token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this._http.get<DashboardData>(`${environment.API_URL}/dashboard`, { headers });
  }
}