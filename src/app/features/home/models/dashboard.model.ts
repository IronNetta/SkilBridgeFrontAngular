export interface BaseDashboard {
  role: 'STUDENT' | 'MENTOR' | 'ADMIN';
}

export interface MentorModel {
  id: number;
  username: string;
  email: string;
  bio: string;
  averageRating: number;
}

export interface StudentDashboard extends BaseDashboard {
  role: 'STUDENT';
  sessionsCount: number;
  feedbacks: number;
  recommendedMentors: MentorModel[];
}

export interface MentorDashboard extends BaseDashboard {
  role: 'MENTOR';
  upcomingSessions: number;
  averageRating: number;
  notifications: number;
}

export interface AdminDashboard extends BaseDashboard {
  role: 'ADMIN';
  usersCount: number;
  newMentors: number;
  weeklySessions: number;
}

export type DashboardData = StudentDashboard | MentorDashboard | AdminDashboard;