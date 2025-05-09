import {Component, computed, effect, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth-service.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { LoginRegisterCardComponent } from '../../../auth/component/login-register-card/login-register-card.component';
import { DashboardService } from '../../../home/services/Dashboard.service';
import { DashboardData,StudentDashboard,MentorDashboard,AdminDashboard } from '../../../home/models/dashboard.model';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ThemeToggleComponent as appThemeToggle } from '../../../../components/theme-toggle/theme-toggle.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, Dialog, LoginRegisterCardComponent, RatingModule, FormsModule, appThemeToggle, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);

  loginVisible = signal(false);
  user = this.authService.currentUser;

  isLoggedIn = computed(() => !!this.user());
  role = computed(() => this.user()?.user.role);

  dashboard = signal<DashboardData | null>(null);

  get studentDashboard() {
    return this.dashboard()?.role === 'STUDENT' ? this.dashboard() as StudentDashboard : null;
  }

  get mentorDashboard() {
    return this.dashboard()?.role === 'MENTOR' ? this.dashboard() as MentorDashboard : null;
  }

  get adminDashboard() {
    return this.dashboard()?.role === 'ADMIN' ? this.dashboard() as AdminDashboard : null;
  }

  constructor() {
    effect(() => {
      const currentUser = this.user(); // on déclenche le signal

      if (currentUser?.token) {
        this.dashboardService.getDashboard().subscribe({
          next: (data) => this.dashboard.set(data),
          error: (err) => console.error('Erreur dashboard :', err)
        });
      }
    });
  }

  showLogin() {
    this.loginVisible.set(true);
  }

  closeLogin() {
    this.loginVisible.set(false);
  }

  hasRecommendedMentors(): boolean {
    return !!this.studentDashboard?.recommendedMentors && this.studentDashboard.recommendedMentors.length > 0;
  }
}
