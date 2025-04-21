import { Injectable, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSessionDto } from '../../auth/models/user-token-dto.model';

@Injectable({ providedIn: 'root' })
export class UserSignalService {
  private userSignal = signal<UserSessionDto | null>(null);

  constructor(private http: HttpClient) {}

  loadProfile(email: string) {
    this.http.get<UserSessionDto>(`http://localhost:8080/user/${email}`)
      .subscribe(this.userSignal);
  }

  get profile() {
    return this.userSignal.asReadonly();
  }

  update(data: Partial<UserSessionDto>) {
    const current = this.userSignal();
    if (!current) return;
    const updated = { ...current, ...data };
    this.userSignal.set(updated);
  }
}
