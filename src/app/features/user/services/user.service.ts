import { inject, Injectable, signal, WritableSignal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSessionDto } from '../../auth/models/user-token-dto.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _http = inject(HttpClient);
  private readonly _profile: WritableSignal<UserSessionDto | null> = signal(null);

  readonly profile = this._profile.asReadonly();

  loadProfile(email: string) {
    this._http.get<UserSessionDto>(`${environment.API_URL}/user/${email}`)
      .subscribe(user => this._profile.set(user));
  }

  updateProfile(email: string, payload: Partial<UserSessionDto & { password: string }>) {
    return this._http.put<void>(`${environment.API_URL}/user/${email}`, payload);
  }

  patchProfileLocally(data: Partial<UserSessionDto>) {
    const current = this._profile();
    if (current) this._profile.set({ ...current, ...data });
  }
}
