import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Availability } from '../models/Availability.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityServiceService {

  private readonly _http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private authHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getMyAvailabilities(): Observable<Availability[]> {
    return this._http.get<Availability[]>(`${environment.API_URL}/availabilities/me`, this.authHeaders());
  }

  addAvailability(input: { start: Date; end: Date }): Observable<any> {
    const mentorId = this.authService.currentUser()?.user.id;
    return this._http.post(`${environment.API_URL}/availabilities`, {
      mentorId: mentorId,
      start: input.start,
      end: input.end
    }, this.authHeaders());
  }

  deleteAvailability(id: number): Observable<any> {
    return this._http.delete(`${environment.API_URL}/availabilities/${id}`, this.authHeaders());
  }
}
