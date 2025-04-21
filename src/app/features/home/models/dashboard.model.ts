export interface DashboardData {
  role: 'STUDENT' | 'MENTOR' | 'ADMIN';
  sessionsCount?: number;
  feedbacks?: number;
  recommendedMentors?: number;
  upcomingSessions?: number;
  averageRating?: number;
  notifications?: number;
  usersCount?: number;
  newMentors?: number;
  weeklySessions?: number;
}
