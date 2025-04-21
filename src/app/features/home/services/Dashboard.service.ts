import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {DashboardData} from '../models/dashboard.model';


@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly _http = inject(HttpClient);

  getDashboard(): Observable<DashboardData> {
    return this._http.get<DashboardData>(`${environment.API_URL}/dashboard`);
  }
}
