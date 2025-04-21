import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Mentor } from '../models/mentor.model';
import { Observable } from 'rxjs';
import {Skill} from '../models/skill.model';

@Injectable({ providedIn: 'root' })
export class MentorService {
  private readonly _http = inject(HttpClient);

  getMentors(skill?: string, minRating?: number, page: number = 1, size: number = 10): Observable<any> {
    const params = new URLSearchParams();
    if (skill) params.append('skill', skill);
    if (minRating) params.append('minRating', minRating.toString());
    params.append('page', page.toString());
    params.append('size', size.toString());

    return this._http.get(`${environment.API_URL}/mentors?${params.toString()}`);
  }

  getSkills() {
    return this._http.get<Skill[]>(`${environment.API_URL}/skills`);
  }
}
